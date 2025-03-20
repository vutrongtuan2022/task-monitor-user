import React, {Fragment, useState} from 'react';

import {IUser, PropsMainPageUser} from './interfaces';
import styles from './MainPageUser.module.scss';
import DataWrapper from '~/components/common/DataWrapper';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import Pagination from '~/components/common/Pagination';
import Table from '~/components/common/Table';
import Button from '~/components/common/Button';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import Search from '~/components/common/Search';
import IconCustom from '~/components/common/IconCustom';
import {Edit, TickCircle, Trash, UserAdd} from 'iconsax-react';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import StateActive from '~/components/common/StateActive';
import {STATUS_ACCOUNT, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import Link from 'next/link';
import Popup from '~/components/common/Popup';
import FormCreateAccount from '../FormCreateAccount';
import Dialog from '~/components/common/Dialog';
import Loading from '~/components/common/Loading';
import FilterCustom from '~/components/common/FilterCustom';
import PositionContainer from '~/components/common/PositionContainer';
import CreateUser from '../CreateUser';
import UpdateUser from '../UpdateUser';

function MainPageUser({}: PropsMainPageUser) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [deleteUser, setDeleteUser] = useState<IUser | null>(null);
	const [dataCreateAccount, setDataCreateAccount] = useState<IUser | null>(null);

	const {_page, _pageSize, _keyword, _status, _roleUuid, _isHaveAcc, action, _uuidUser} = router.query;

	const listUser = useQuery([QUERY_KEY.table_list_user, _page, _pageSize, _keyword, _status, _roleUuid, _isHaveAcc], {
		queryFn: () =>
			httpRequest({
				http: userServices.listUser({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					status: 1,
					isHaveAcc: !!_isHaveAcc ? Number(_isHaveAcc) : null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcDeleteUser = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa nhân viên thành công',
				http: userServices.updateStatus({
					uuid: deleteUser?.uuid!,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDeleteUser(null);
				queryClient.invalidateQueries([QUERY_KEY.table_list_user]);
			}
		},
	});

	return (
		<Fragment>
			<div className={styles.container}>
				<Loading loading={funcDeleteUser.isLoading} />
				<div className={styles.head}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo tên nhân viên, ID' />
						</div>

						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Tình trạng'
								query='_isHaveAcc'
								listFilter={[
									{
										id: STATUS_ACCOUNT.HAVE,
										name: 'Đã cấp tài khoản',
									},
									{
										id: STATUS_ACCOUNT.NOT_HAVE,
										name: 'Chưa cấp tài khoản',
									},
								]}
							/>
						</div>
					</div>

					<div className={styles.btn}>
						<Button
							p_14_24
							rounded_8
							light-blue
							href={''}
							onClick={() => {
								router.replace({
									pathname: router.pathname,
									query: {
										...router.query,
										action: 'create',
									},
								});
							}}
							icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
						>
							Thêm mới nhân viên
						</Button>
					</div>
				</div>
				<WrapperScrollbar>
					<DataWrapper
						data={listUser?.data?.items || []}
						loading={listUser.isLoading}
						noti={
							<Noti
								button={
									<Button
										p_14_24
										rounded_8
										light-blue
										href={''}
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
										Thêm mới nhân viên
									</Button>
								}
							/>
						}
					>
						<Table
							fixedHeader={true}
							data={listUser?.data?.items || []}
							column={[
								{
									title: 'STT',
									render: (data: IUser, index: number) => <>{index + 1}</>,
								},
								{
									title: 'Mã nhân viên',
									render: (data: IUser) => <span>{data?.code || '---'}</span>,
								},
								{
									title: 'Họ tên',
									fixedLeft: true,
									render: (data: IUser) => <p className={styles.link}>{data?.fullname || '---'}</p>,
								},
								{
									title: 'Số điện thoại',
									render: (data: IUser) => <>{data?.phone || '---'}</>,
								},
								{
									title: 'Email',
									render: (data: IUser) => <span>{data?.email || '---'}</span>,
								},
								{
									title: 'Tình trạng tài khoản',
									render: (data: IUser) => (
										<StateActive
											stateActive={data?.isHaveAcc}
											listState={[
												{
													state: STATUS_ACCOUNT.HAVE,
													text: 'Đã cấp tài khoản',
													textColor: '#fff',
													backgroundColor: '#06D7A0',
												},
												{
													state: STATUS_ACCOUNT.NOT_HAVE,
													text: 'Chưa cấp tài khoản',
													textColor: '#fff',
													backgroundColor: '#F37277',
												},
											]}
										/>
									),
								},

								{
									title: 'Hành động',
									fixedRight: true,
									render: (data: IUser) => (
										<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
											{data?.isHaveAcc == STATUS_ACCOUNT.NOT_HAVE ? (
												<IconCustom
													icon={<UserAdd fontSize={20} fontWeight={600} />}
													tooltip='Cấp tài khoản'
													color='#6CD1F2'
													onClick={() => {
														setDataCreateAccount(data);
													}}
												/>
											) : (
												<IconCustom icon={<TickCircle size='23' />} tooltip='Đã cấp tài khoản' color='#35c244' />
											)}

											<IconCustom
												type='edit'
												icon={<Edit fontSize={20} fontWeight={600} />}
												tooltip='Chỉnh sửa'
												onClick={() => {
													router.replace({
														pathname: router.pathname,
														query: {
															...router.query,
															_uuidUser: data?.uuid,
														},
													});
												}}
											/>

											<IconCustom
												type='delete'
												icon={<Trash fontSize={20} fontWeight={600} />}
												tooltip='Xóa bỏ'
												onClick={() => {
													setDeleteUser(data);
												}}
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
						total={listUser?.data?.pagination?.totalCount}
						dependencies={[_pageSize, _keyword, _status, _roleUuid, _isHaveAcc]}
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
					<CreateUser
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
					open={!!_uuidUser}
					onClose={() => {
						const {_uuidUser, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				>
					<UpdateUser
						onClose={() => {
							const {_uuidUser, ...rest} = router.query;

							router.replace({
								pathname: router.pathname,
								query: {
									...rest,
								},
							});
						}}
					/>
				</PositionContainer>

				<Popup open={!!dataCreateAccount} onClose={() => setDataCreateAccount(null)}>
					<FormCreateAccount dataCreateAccount={dataCreateAccount} onClose={() => setDataCreateAccount(null)} />
				</Popup>
				<Dialog
					type='error'
					open={!!deleteUser}
					onClose={() => setDeleteUser(null)}
					title={'Xác nhận xóa'}
					note={'Bạn có chắc chắn muốn xóa nhân viên này?'}
					onSubmit={funcDeleteUser.mutate}
				/>
			</div>{' '}
		</Fragment>
	);
}

export default MainPageUser;
