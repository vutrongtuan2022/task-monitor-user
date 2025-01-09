import React, {useState} from 'react';

import {IContractor, PropsMainPageContractor} from './interfaces';
import styles from './MainPageContractor.module.scss';
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
import FilterCustom from '~/components/common/FilterCustom';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import contractorServices from '~/services/contractorServices';
import contractorcatServices from '~/services/contractorcatServices';
import PositionContainer from '~/components/common/PositionContainer';
import CreateContractor from '../CreateContractor';
import Dialog from '~/components/common/Dialog';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';
import UpdateContractor from '../UpdateContractor';
import Tippy from '@tippyjs/react';

function MainPageContractor({}: PropsMainPageContractor) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _type, action, _uuidContractor} = router.query;

	const [uuidDelete, setUuidDelete] = useState<string>('');

	const listContractor = useQuery([QUERY_KEY.table_contractor, _page, _pageSize, _keyword, _type], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.listContractor({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					type: Number(_type) || null,
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listGroupContractor = useQuery([QUERY_KEY.dropdown_group_contractor], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.categoryContractorCat({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcDeleteContractor = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa nhà thầu thành công!',
				http: contractorServices.updateStatusContractor({
					uuid: uuidDelete,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidDelete('');
				queryClient.invalidateQueries([QUERY_KEY.table_contractor]);
			}
		},
	});

	const handleDeleteContractor = () => {
		if (!uuidDelete) {
			return toastWarn({msg: 'Không tìm thấy nhà thầu!'});
		}

		return funcDeleteContractor.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={funcDeleteContractor.isLoading} />

			<div className={styles.head}>
				<div className={styles.search_fillter}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo nhà thầu' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Nhóm nhà thầu'
							query='_type'
							listFilter={listGroupContractor.data?.map((v: any) => ({
								id: v?.id,
								name: v?.name,
							}))}
						/>
					</div>
				</div>

				<div className={styles.btn}>
					<Button
						p_14_24
						rounded_8
						light-blue
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
						onClick={() => {
							router.replace({
								pathname: router.pathname,
								query: {
									...router.query,
									action: 'create',
								},
							});
						}}
					>
						Thêm mới nhà thầu
					</Button>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listContractor?.data?.items || []}
					loading={listContractor.isLoading}
					noti={
						<Noti
							button={
								<Button
									p_14_24
									rounded_8
									light-blue
									icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
									onClick={() => {
										router.replace({
											pathname: router.pathname,
											query: {
												...router.query,
												action: 'create',
											},
										});
									}}
								>
									Thêm mới nhà thầu
								</Button>
							}
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={listContractor?.data?.items || []}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: IContractor, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tên nhà thầu',
								render: (data: IContractor) => <span>{data?.name}</span>,
							},
							{
								title: 'Nhóm nhà thầu',
								render: (data: IContractor) => <>{data?.contractorCat?.name || '---'}</>,
							},
							{
								title: 'Địa chỉ',
								render: (data: IContractor) => <>{data?.address || '---'}</>,
							},
							{
								title: 'Mô tả',
								render: (data: IContractor) => (
									<>
										{(data?.note && (
											<Tippy content={data?.note}>
												<p className={styles.name}>{data?.note || '---'}</p>
											</Tippy>
										)) ||
											'---'}
									</>
								),
							},

							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IContractor) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											type='edit'
											icon={<Edit fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											onClick={() => {
												router.replace({
													pathname: router.pathname,
													query: {
														...router.query,
														_uuidContractor: data?.uuid,
													},
												});
											}}
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
					total={listContractor?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _type]}
				/>
			</WrapperScrollbar>

			<PositionContainer
				open={action == 'create'}
				onClose={() => {
					const {action, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<CreateContractor
					onClose={() => {
						const {action, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>

			<PositionContainer
				open={!!_uuidContractor}
				onClose={() => {
					const {_uuidContractor, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<UpdateContractor
					onClose={() => {
						const {_uuidContractor, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>

			<Dialog
				type='error'
				open={!!uuidDelete}
				onClose={() => setUuidDelete('')}
				title={'Xóa nhà thầu'}
				note={'Bạn có chắc chắn muốn xóa nhà thầu này?'}
				onSubmit={handleDeleteContractor}
			/>
		</div>
	);
}

export default MainPageContractor;
