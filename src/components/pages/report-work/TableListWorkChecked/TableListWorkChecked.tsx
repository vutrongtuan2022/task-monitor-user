import React, {useCallback, useContext, useMemo, useState} from 'react';

import {PropsTableListWorkChecked} from './interfaces';
import styles from './TableListWorkChecked.module.scss';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import {QUERY_KEY, STATE_WORK_PROJECT, STATUS_CONFIG} from '~/constants/config/enum';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import activityServices from '~/services/activityServices';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import StateActive from '~/components/common/StateActive';
import Pagination from '~/components/common/Pagination';
import {CreateReportWork, ICreateReportWork} from '../context';
import {IActivityRegister} from '../MainCreateReportWork/interfaces';
import Tippy from '@tippyjs/react';
import useDebounce from '~/common/hooks/useDebounce';

function TableListWorkChecked({onClose}: PropsTableListWorkChecked) {
	const router = useRouter();
	const {_action} = router.query;

	const {projectUuid, listActivity, setListActivity} = useContext<ICreateReportWork>(CreateReportWork);

	const [listWorkChecked, setListWorkChecked] = useState<IActivityRegister[]>(listActivity);

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [state, setState] = useState<number | null>(null);
	const [stage, setStage] = useState<number | null>(null);

	const debounce = useDebounce(keyword, 600);

	// Data reponsive api
	const {data: listWork, isLoading} = useQuery([QUERY_KEY.table_list_work_project, page, pageSize, debounce, state, stage, projectUuid], {
		queryFn: () =>
			httpRequest({
				http: activityServices.getActivityRegister({
					page: page,
					pageSize: pageSize,
					keyword: debounce,
					status: STATUS_CONFIG.ACTIVE,
					state: state,
					stage: stage,
					projectUuid: projectUuid,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!projectUuid && _action == 'create',
	});

	// Xử lý check all ==> Thêm tất cả dữ liệu api trả về vào mảng state
	const handleCheckedAll = useCallback(
		(e: any) => {
			const {checked} = e.target;

			if (checked) {
				setListWorkChecked((prev: any) => [...prev, ...listWork?.items]);
			} else {
				setListWorkChecked((prev: any) => {
					return prev?.filter((v: any) => listWork?.items?.every((x: any) => x?.activityUuid != v?.activityUuid));
				});
			}
		},
		[listWork?.items]
	);

	// Xử lý check row (item)
	const handleCheckedRow = (e: any, data: any) => {
		const {checked} = e.target;

		if (checked) {
			setListWorkChecked((prev: any) => [...prev, data]);
		} else {
			setListWorkChecked((prev: any) => {
				return prev?.filter((v: any) => v?.activityUuid != data?.activityUuid);
			});
		}
	};

	// Xử lý trạng thái checked của row (item)
	const handleIsCheckedRow = (data: any) => {
		return listWorkChecked.some((v) => v?.activityUuid == data?.activityUuid);
	};

	// Xử lý trạng thái checked all
	const isCheckedAll = useMemo(() => {
		return listWork?.items.every((v: any) => {
			return listWorkChecked?.some((x: any) => x?.activityUuid == v?.activityUuid);
		});
	}, [listWork?.items, listWorkChecked]);

	// Lưu dữ liệu vào context
	const handleSaveWorks = () => {
		setListActivity(listWorkChecked);
		onClose();
	};

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h4 className={styles.title}>Chọn công việc báo cáo</h4>
				<div className={styles.group_button}>
					<div>
						<Button p_12_20 grey rounded_6 onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>

					<div className={styles.btn}>
						<Button
							p_12_20
							primary
							rounded_6
							disable={listWorkChecked.length == 0}
							icon={<FolderOpen size={18} color='#fff' />}
							onClick={handleSaveWorks}
						>
							Lưu lại
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.line}></div>
			<div className={styles.form}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search data={keyword} onSetData={setKeyword} placeholder='Tìm kiếm theo tên dự án, ID' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Giai đoạn'
							data={stage}
							onSetData={setStage}
							listFilter={[
								{
									id: 1,
									name: 'Giai đoạn chuẩn bị đầu tư',
								},
								{
									id: 2,
									name: 'Giai đoạn thực hiện đầu tư',
								},
								{
									id: 3,
									name: 'Giai đoạn kết thúc đầu tư',
								},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							data={state}
							onSetData={setState}
							listFilter={[
								{
									id: STATE_WORK_PROJECT.NOT_PROCESSED,
									name: 'Chưa xử lý',
								},
								{
									id: STATE_WORK_PROJECT.PROCESSING,
									name: 'Đang xử lý',
								},
							]}
						/>
					</div>
				</div>
				<WrapperScrollbar isWrappreTable={false}>
					<DataWrapper
						data={listWork?.items || []}
						loading={isLoading}
						noti={<Noti title='Danh sách trống!' des='Danh sách công việc trống!' />}
					>
						<Table
							fixedHeader={true}
							isCheckedAll={isCheckedAll}
							handleCheckedAll={handleCheckedAll}
							handleCheckedRow={handleCheckedRow}
							handleIsCheckedRow={handleIsCheckedRow}
							data={listWork?.items || []}
							column={[
								{
									title: 'STT',
									checkBox: true,

									render: (data: IActivityRegister, index: number) => <>{index + 1}</>,
								},
								{
									title: 'Tên công việc',
									render: (data: IActivityRegister) => (
										<Tippy content={data?.name}>
											<p className={styles.name}>{data?.name || '---'}</p>
										</Tippy>
									),
								},
								{
									title: 'Thuộc nhóm công việc',
									render: (data: IActivityRegister) => (
										<Tippy content={data?.parent?.name || '---'}>
											<p className={styles.group_task}>{data?.parent?.name || '---'}</p>
										</Tippy>
									),
								},
								{
									title: 'Giai đoạn thực hiện',
									render: (data: IActivityRegister) => (
										<>
											{data?.stage == -1 && '---'}
											{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
											{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
											{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư'}
										</>
									),
								},
								{
									title: 'Megatype',
									render: (data: IActivityRegister) => <>{data?.megaType || '---'}</>,
								},
								{
									title: 'Trạng thái',
									render: (data: IActivityRegister) => (
										<StateActive
											stateActive={data?.state}
											listState={[
												{
													state: STATE_WORK_PROJECT.NOT_PROCESSED,
													text: 'Chưa xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#FDAD73',
												},
												{
													state: STATE_WORK_PROJECT.PROCESSING,
													text: 'Đang xử lý',
													textColor: '#FFFFFF',
													backgroundColor: '#16C1F3',
												},
												{
													state: STATE_WORK_PROJECT.COMPLETED,
													text: 'Đã hoàn thành',
													textColor: '#FFFFFF',
													backgroundColor: '#06D7A0',
												},
											]}
										/>
									),
								},
							]}
						/>
					</DataWrapper>
					<Pagination
						currentPage={page}
						onSetPage={setPage}
						pageSize={pageSize}
						onSetpageSize={setPageSize}
						total={listWork?.pagination?.totalCount}
						dependencies={[pageSize, debounce, state, stage]}
					/>
				</WrapperScrollbar>
			</div>
		</div>
	);
}

export default TableListWorkChecked;
