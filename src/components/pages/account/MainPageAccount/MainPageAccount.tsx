import React, {useState} from 'react';
import {IAccount, PropsMainPageAccount} from './interfaces';
import styles from './MainPageAccount.module.scss';
import Dialog from '~/components/common/Dialog';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Pagination from '~/components/common/Pagination';
import IconCustom from '~/components/common/IconCustom';
import StateActive from '~/components/common/StateActive';
import Table from '~/components/common/Table';
import Noti from '~/components/common/DataWrapper/components/Noti';
import FilterCustom from '~/components/common/FilterCustom';
import {QUERY_KEY, STATUS_ACCOUNT, STATUS_CONFIG, TYPE_ACCOUNT} from '~/constants/config/enum';
import Search from '~/components/common/Search';
import Loading from '~/components/common/Loading';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import accountServices from '~/services/accountServices';
import {httpRequest} from '~/services';
import {Edit, Lock1, Trash, Unlock} from 'iconsax-react';
import PositionContainer from '~/components/common/PositionContainer';
import UpdateAccount from '../../account/UpdateAccount';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import roleServices from '~/services/roleServices';

function MainPageAccount({}: PropsMainPageAccount) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _roleUuid, _status, _uuidAccount} = router.query;

	const {infoUser} = useSelector((state: RootState) => state.user);
	const [dataStatus, setDataStatus] = useState<IAccount | null>(null);
	const [deleteAccount, setDeleteAccount] = useState<IAccount | null>(null);

	const listAccount = useQuery([QUERY_KEY.table_list_account, _page, _pageSize, _keyword, _roleUuid, _status], {
		queryFn: () =>
			httpRequest({
				http: accountServices.listAccount({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: (_keyword as string) || '',
					status: !!_status ? [Number(_status)] : [STATUS_ACCOUNT.HAVE, STATUS_ACCOUNT.LOCK],
					roleUuid: (_roleUuid as string) || '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listRole = useQuery([QUERY_KEY.dropdown_role], {
		queryFn: () =>
			httpRequest({
				http: roleServices.categoryRole({
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == STATUS_CONFIG.ACTIVE ? 'Dừng hoạt động thành công' : 'Mở khóa thành công',
				http: accountServices.updateStatus({
					uuid: dataStatus?.uuid!,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_list_account]);
			}
		},
	});

	const funcDeleteAccount = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa tài khoản thành công',
				http: accountServices.deleteAccount({
					uuid: deleteAccount?.uuid!,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDeleteAccount(null);
				queryClient.invalidateQueries([QUERY_KEY.table_list_account]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcChangeStatus.isLoading || funcDeleteAccount.isLoading} />
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên tài khoản' />
					</div>

					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_status'
							listFilter={[
								{
									id: STATUS_ACCOUNT.HAVE,
									name: 'Hoạt động',
								},
								{
									id: STATUS_ACCOUNT.LOCK,
									name: 'Đã khóa',
								},
							]}
						/>
					</div>

					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Nhóm quyền'
							query='_roleUuid'
							listFilter={listRole?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
						/>
					</div>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={listAccount?.data?.items || []}
					loading={listAccount.isLoading}
					noti={<Noti des='Hiện tại chưa có tài khoản nào' />}
				>
					<Table
						fixedHeader={true}
						data={listAccount?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IAccount, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Mã nhân viên',
								render: (data: IAccount) => <span>{data?.user?.code || '---'}</span>,
							},
							{
								title: 'Tên nhân viên',
								render: (data: IAccount) => <span>{data?.user?.fullname || '---'}</span>,
							},
							{
								title: 'Tên tài khoản',
								render: (data: IAccount) => <span>{data?.userName || '---'}</span>,
							},
							{
								title: 'Trạng thái tài khoản',
								render: (data: IAccount) => (
									<StateActive
										stateActive={data?.status}
										listState={[
											{
												state: STATUS_CONFIG.ACTIVE,
												text: 'Hoạt động',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
											{
												state: STATUS_CONFIG.NOT_ACTIVE,
												text: 'Đã khóa',
												textColor: '#fff',
												backgroundColor: '#F37277',
											},
										]}
									/>
								),
							},
							{
								title: 'Nhóm quyền',
								render: (data: IAccount) => (
									<StateActive
										stateActive={
											data?.role?.code === 'R1'
												? TYPE_ACCOUNT.USER
												: data?.role?.code === 'R2'
												? TYPE_ACCOUNT.MANAGER
												: TYPE_ACCOUNT.ADMIN
										}
										listState={[
											{
												state: TYPE_ACCOUNT.ADMIN,
												text: 'ADMIN',
												textColor: '#fff',
												backgroundColor: '#06D7A0',
											},
											{
												state: TYPE_ACCOUNT.MANAGER,
												text: 'MANAGER',
												textColor: '#fff',
												backgroundColor: '#FDAD73',
											},
											{
												state: TYPE_ACCOUNT.USER,
												text: 'USER',
												textColor: '#fff',
												backgroundColor: '#6CD1F2',
											},
										]}
									/>
								),
							},

							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: IAccount) => (
									<>
										{infoUser?.uuid != data?.uuid && (
											<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
												<IconCustom
													icon={
														data?.status == STATUS_CONFIG.ACTIVE ? (
															<Lock1 size='22' color='#FDAD73' />
														) : (
															<Unlock size='22' color='#06D7A0' />
														)
													}
													tooltip={data.status == STATUS_CONFIG.ACTIVE ? 'Khóa' : 'Mở khóa'}
													color='#777E90'
													onClick={() => {
														setDataStatus(data);
													}}
												/>
												<IconCustom
													type='edit'
													icon={<Edit fontSize={20} fontWeight={600} />}
													tooltip='Chỉnh sửa'
													onClick={() => {
														router.replace({
															pathname: router.pathname,
															query: {
																...router.query,
																_uuidAccount: data?.uuid,
															},
														});
													}}
												/>

												<IconCustom
													type='delete'
													icon={<Trash fontSize={20} fontWeight={600} />}
													tooltip='Xóa bỏ'
													onClick={() => {
														setDeleteAccount(data);
													}}
												/>
											</div>
										)}
									</>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listAccount?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _roleUuid, _status]}
				/>
			</WrapperScrollbar>

			<PositionContainer
				open={!!_uuidAccount}
				onClose={() => {
					const {_uuidAccount, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<UpdateAccount
					onClose={() => {
						const {_uuidAccount, ...rest} = router.query;

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
				open={!!deleteAccount}
				onClose={() => setDeleteAccount(null)}
				title={'Xác nhận xóa'}
				note={'Bạn có chắc chắn muốn xóa tài khoản này?'}
				onSubmit={funcDeleteAccount.mutate}
			/>
			<Dialog
				type='error'
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khóa hoạt động tài khoản' : 'Mở khóa hoạt động tài khoản'}
				note={
					dataStatus?.status == STATUS_CONFIG.ACTIVE
						? 'Bạn có chắc chắn muốn khóa hoạt động tài khoản này?'
						: 'Bạn có chắc chắn muốn mở khóa hoạt động tài khoản này?'
				}
				onSubmit={funcChangeStatus.mutate}
			/>
		</div>
	);
}

export default MainPageAccount;
