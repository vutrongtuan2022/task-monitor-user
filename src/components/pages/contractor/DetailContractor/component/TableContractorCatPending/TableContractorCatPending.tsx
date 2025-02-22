import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {QUERY_KEY} from '~/constants/config/enum';
import styles from './TableContractorCatPending.module.scss';
import clsx from 'clsx';
import {PropsTableContractorCatPending} from './interface';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import StateActive from '~/components/common/StateActive';
import Pagination from '~/components/common/Pagination';
import Moment from 'react-moment';
import Table from '~/components/common/Table';
import IconCustom from '~/components/common/IconCustom';
import {CloseCircle, TickCircle} from 'iconsax-react';
import {httpRequest} from '~/services';
import contractorServices from '~/services/contractorServices';
import Dialog from '~/components/common/Dialog';
import icons from '~/constants/images/icons';
import Form from '~/components/common/Form';
import Popup from '~/components/common/Popup';
import TextArea from '~/components/common/Form/components/TextArea';
import Button from '~/components/common/Button';

function TableContractorCatPending({}: PropsTableContractorCatPending) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _uuid} = router.query;
	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [uuidCancel, setUuidCancel] = useState<string>('');
	const [form, setForm] = useState<{feedback: string}>({
		feedback: '',
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
		<div className={clsx(styles.basic_info, styles.mt)}>
			<div className={styles.head}>
				<h4>Danh sách nhóm nhà thầu đợi duyệt</h4>
			</div>
			<WrapperScrollbar>
				<DataWrapper
					data={
						// listContractFund?.items ||
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
					}
					// loading={listContractFund?.isLoading}
					noti={
						<Noti
							title='Danh sách nhóm nhà thầu đợi duyệt trống!'
							des='Hiện tại chưa có thông tin nhóm nhà thầu đợi duyệt nào!'
						/>
					}
				>
					<Table
						fixedHeader={true}
						data={
							// listContractFund?.items ||
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
						}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},

							{
								title: 'Tên nhà thầu',
								render: (data: any) => <>{'Công ty cổ phần Sunny34'}</>,
							},

							{
								title: 'Nhóm nhà thầu cần thêm',
								render: (data: any) => <span style={{color: '#EE464C'}}>{'Nhóm ABC'}</span>,
							},
							{
								title: 'Người gửi yêu cầu',
								render: (data: any) => <>{'Vũ Minh Tường'}</>,
							},
							{
								title: 'Thời gian yêu cầu',
								render: (data: any) => (
									<p>{data?.releasedDate ? <Moment date={data?.releasedDate} format='DD/MM/YYYY' /> : '---'}</p>
								),
							},

							{
								title: 'hành động',
								render: (data: any) => (
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
					total={100}
					dependencies={[_pageSize, _uuid]}
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

export default TableContractorCatPending;
