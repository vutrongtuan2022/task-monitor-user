import React, {useState} from 'react';

import {ITaskCat, PropsMainPageTask} from './interfaces';
import styles from './MainPageTask.module.scss';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import icons from '~/constants/images/icons';
import Image from 'next/image';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import IconCustom from '~/components/common/IconCustom';
import {Edit, Trash} from 'iconsax-react';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import taskCatServices from '~/services/taskCatServices';
import Moment from 'react-moment';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';
import Dialog from '~/components/common/Dialog';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import {PATH} from '~/constants/config';
import Popup from '~/components/common/Popup';
import ImportExcel from '~/components/common/ImportExcel';

function MainPageTask({}: PropsMainPageTask) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [isImportPopupOpen, setImportPopupOpen] = useState(false);
	const {_page, _pageSize, _keyword} = router.query;

	const [uuidDelete, setUuidDelete] = useState<string>('');
	const [file, setFile] = useState<any>(null);

	const listTaskCat = useQuery([QUERY_KEY.table_task_cat, _page, _pageSize, _keyword], {
		queryFn: () =>
			httpRequest({
				http: taskCatServices.listTaskCat({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcDeleteTaskCat = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa quy trình thành công!',
				http: taskCatServices.updateStatusTaskCat({
					uuid: uuidDelete,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidDelete('');
				queryClient.invalidateQueries([QUERY_KEY.table_task_cat]);
			}
		},
	});

	const handleDeleteTaskCat = () => {
		if (!uuidDelete) {
			return toastWarn({msg: 'Không tìm thấy nhà thầu!'});
		}

		return funcDeleteTaskCat.mutate();
	};

	// Func import excel
	const fucnImportExcel = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Import quy trình thành công!',
				http: taskCatServices.importTaskExcel({
					FileData: file,
					Type: 1,
					name: file?.name?.split('.')?.[0],
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setFile(null);
				handleCloseImport();
				queryClient.invalidateQueries([QUERY_KEY.table_task_cat]);
			}
		},
	});

	const handleImportTask = () => {
		return fucnImportExcel.mutate();
	};

	const handleCloseImport = () => {
		setImportPopupOpen(false);
	};

	const handleOpenImport = () => {
		setImportPopupOpen(true);
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcDeleteTaskCat.isLoading || fucnImportExcel.isLoading} />
			<div className={styles.head}>
				<div className={styles.search_fillter}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên quy trình' />
					</div>
				</div>

				<div className={styles.btn}>
					<Button rounded_8 w_fit p_8_16 green onClick={handleOpenImport}>
						Nhập file
					</Button>
					<Button
						p_10_24
						rounded_8
						light-blue
						href={PATH.CreateTask}
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
					>
						Thêm mới quy trình
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listTaskCat?.data?.items || []}
					loading={listTaskCat.isLoading}
					noti={
						<Noti
							button={
								<Button
									p_10_24
									rounded_8
									light-blue
									href={PATH.CreateTask}
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
								>
									Thêm mới quy trình
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={listTaskCat?.data?.items || []}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: ITaskCat, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Tên quy trình',
								render: (data: ITaskCat) => (
									<Tippy content='Chi tiết quy trình'>
										<Link href={`${PATH.Task}/${data?.uuid}?_uuid=${data?.id}`} className={styles.link}>
											{data?.name}
										</Link>
									</Tippy>
								),
							},
							{
								title: 'Ngày tạo',
								render: (data: ITaskCat) => <Moment date={data?.created} format='DD/MM/YYYY' />,
							},
							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: ITaskCat) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											type='edit'
											icon={<Edit fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											href={`${PATH.UpdateTask}?_uuid=${data?.uuid}`}
										/>
										<IconCustom
											type='delete'
											icon={<Trash fontSize={20} fontWeight={600} />}
											tooltip='Xóa bỏ'
											onClick={() => setUuidDelete(data?.uuid)}
										/>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listTaskCat?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword]}
				/>
			</WrapperScrollbar>

			<Dialog
				type='error'
				open={!!uuidDelete}
				onClose={() => setUuidDelete('')}
				title={'Xóa quy trình'}
				note={'Bạn có chắc chắn muốn xóa quy trình này?'}
				onSubmit={handleDeleteTaskCat}
			/>

			<Popup open={isImportPopupOpen} onClose={handleCloseImport}>
				<ImportExcel
					name='file-tast'
					file={file}
					pathTemplate='/static/files/MauQuyTrinhXayDungHaTang.xlsx'
					setFile={setFile}
					onSubmit={handleImportTask}
					onClose={handleCloseImport}
				/>
			</Popup>
		</div>
	);
}

export default MainPageTask;
