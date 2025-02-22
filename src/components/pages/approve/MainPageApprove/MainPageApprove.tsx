import React, {useState} from 'react';
import styles from './MainPageApprove.module.scss';
import {ITablePageApprove, PropsMainPageApprove} from './interface';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';

import icons from '~/constants/images/icons';
import {useRouter} from 'next/router';

import IconCustom from '~/components/common/IconCustom';
import {CloseCircle, TickCircle} from 'iconsax-react';
import Dialog from '~/components/common/Dialog';
import Form from '~/components/common/Form';
import Popup from '~/components/common/Popup';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import FilterCustom from '~/components/common/FilterCustom';
import contractorcatServices from '~/services/contractorcatServices';
import Pagination from '~/components/common/Pagination';
import contractorServices from '~/services/contractorServices';
import Loading from '~/components/common/Loading';
import Moment from 'react-moment';

function MainPageApprove({}: PropsMainPageApprove) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _contractorCat} = router.query;
	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [uuidCancel, setUuidCancel] = useState<string>('');
	const [form, setForm] = useState<{feedback: string}>({
		feedback: '',
	});

	const {data: listUpdateContractorCat, isLoading} = useQuery(
		[QUERY_KEY.table_update_contractor_cat, _page, _pageSize, _keyword, _contractorCat],
		{
			queryFn: () =>
				httpRequest({
					http: contractorServices.getListUpdateContractorCat({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 10,
						status: STATUS_CONFIG.ACTIVE,
						keyword: _keyword as string,
						contractorCat: (_contractorCat as string) || '',
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

	const {data: listGroupContractor} = useQuery([QUERY_KEY.dropdown_group_contractor], {
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

	const funcConfirm = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Duyệt nhóm nhà thầu thành công!',
				http: contractorServices.changeUpdateContractorCat({
					uuid: uuidConfirm,
					state: 1,
					rejected: '',
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidConfirm('');
				queryClient.invalidateQueries([QUERY_KEY.table_update_contractor_cat]);
			}
		},
	});

	const funcCancel = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Từ chối nhóm nhà thầu thành công!',
				http: contractorServices.changeUpdateContractorCat({
					uuid: uuidCancel,
					state: 2,
					rejected: form?.feedback,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidCancel('');
				queryClient.invalidateQueries([QUERY_KEY.table_update_contractor_cat]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcConfirm.isLoading || funcCancel.isLoading} />
			<div className={styles.head}>
				<div className={styles.search_fillter}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên nhà thầu' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Nhóm nhà thầu'
							query='_contractorCat'
							listFilter={listGroupContractor?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
						/>
					</div>
				</div>
			</div>
			<WrapperScrollbar>
				<DataWrapper data={listUpdateContractorCat?.items || []} loading={isLoading}>
					<Table
						fixedHeader={true}
						data={listUpdateContractorCat?.items || []}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: ITablePageApprove, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tên nhà thầu',
								render: (data: ITablePageApprove) => <>{data?.contractor?.name || '---'}</>,
							},
							{
								title: 'Nhóm nhà thầu cần thêm',
								render: (data: ITablePageApprove) => <>{data?.contractorCat?.name || '---'}</>,
							},
							{
								title: 'Người gửi yêu cầu',
								render: (data: ITablePageApprove) => <>{data?.user?.fullname || '---'}</>,
							},
							{
								title: 'Thời gian yêu cầu',
								render: (data: ITablePageApprove) => (
									<>{data?.timeCreated ? <Moment date={data?.timeCreated} format='DD/MM/YYYY' /> : '---'}</>
								),
							},

							{
								title: 'Hành động',
								fixedRight: true,
								render: (data: ITablePageApprove) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<>
											<IconCustom
												color='#06D7A0'
												icon={<TickCircle fontSize={20} fontWeight={600} />}
												tooltip='Duyệt nhóm nhà thầu'
												onClick={() => setUuidConfirm(data?.uuid)}
											/>
											<IconCustom
												color='#EE464C'
												icon={<CloseCircle fontSize={20} fontWeight={600} />}
												tooltip='Từ chối nhóm nhà thầu'
												onClick={() => setUuidCancel(data?.uuid)}
											/>
										</>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 10}
					total={listUpdateContractorCat?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _contractorCat]}
				/>
			</WrapperScrollbar>

			<Dialog
				type='primary'
				open={!!uuidConfirm}
				icon={icons.success}
				onClose={() => setUuidConfirm('')}
				title={'Duyệt báo cáo nhóm'}
				note={'Bạn có chắc chắn muốn duyệt nhóm này không?'}
				onSubmit={funcConfirm.mutate}
			/>

			<Form form={form} setForm={setForm}>
				<Popup open={!!uuidCancel} onClose={() => setUuidCancel('')}>
					<div className={styles.main_popup}>
						<div className={styles.head_popup}>
							<h4>Xác nhận từ chối thêm nhóm nhà thầu mới</h4>
						</div>
						<div className={styles.form_poup}>
							<TextArea name='feedback' placeholder='Nhập lý do từ chối' label='Lý do từ chối' />
							<div className={styles.group_button}>
								<div>
									<Button p_12_20 grey rounded_6 onClick={() => setUuidCancel('')}>
										Không
									</Button>
								</div>
								<div className={styles.btn}>
									<Button disable={!form.feedback} p_12_20 error rounded_6 onClick={funcCancel.mutate}>
										Có, tôi đồng ý
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Popup>
			</Form>
		</div>
	);
}

export default MainPageApprove;
