import Breadcrumb from '~/components/common/Breadcrumb';
import styles from './MainPageDetailCSCT.module.scss';
import {IContractsPN, IDetailCSCT, PropsMainPageDetailCSCT} from './interfaces';
import {PATH} from '~/constants/config';
import GridColumn from '~/components/layouts/GridColumn';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATE_CONTRACT_WORK, STATUS_CONFIG, STATUS_CSCT} from '~/constants/config/enum';
import {convertCoin} from '~/common/funcs/convertCoin';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import pnServices from '~/services/pnServices';
import clsx from 'clsx';
import DataWrapper from '~/components/common/DataWrapper';
import contractsServices from '~/services/contractsServices';
import Table from '~/components/common/Table';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import Moment from 'react-moment';
import Pagination from '~/components/common/Pagination';
import Button from '~/components/common/Button';
import {useState} from 'react';
import contractorServices from '~/services/contractorServices';
import Dialog from '~/components/common/Dialog';
import icons from '~/constants/images/icons';
import Loading from '~/components/common/Loading';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function MainPageDetailCSCT({}: PropsMainPageDetailCSCT) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const {infoUser} = useSelector((state: RootState) => state.user);

	const {_uuid} = router.query;

	const [uuidDelete, setUuidDelete] = useState<string>('');

	const {data: detailCSCT} = useQuery<IDetailCSCT>([QUERY_KEY.detail_csct, _uuid], {
		queryFn: () =>
			httpRequest({
				http: pnServices.detailPN({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const {data: ListPNContract, isLoading} = useQuery([QUERY_KEY.table_pn_contract, _uuid], {
		queryFn: () =>
			httpRequest({
				http: pnServices.getListPNContractByPN({
					uuid: (_uuid as string) || '',
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const funcDelete = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Xóa CSCT thanh toán thành công!',
				http: pnServices.updateStatusPN({
					uuid: uuidDelete,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setUuidDelete('');
				queryClient.invalidateQueries([QUERY_KEY.table_CSCT, QUERY_KEY.detail_csct]);
				router.back();
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcDelete.isLoading} />
			<Breadcrumb
				listUrls={[
					{
						path: PATH.CSCT,
						title: 'Danh sách CSCT thanh toán',
					},
					{
						path: '',
						title: 'Chi tiết',
					},
				]}
				action={
					infoUser?.userUuid === detailCSCT?.user?.uuid ? (
						<div className={styles.group_btn}>
							{detailCSCT?.state == STATUS_CSCT.NUMBER_ISSUED || detailCSCT?.state == STATUS_CSCT.REJECTED ? (
								<Button p_14_24 rounded_8 light-red onClick={() => setUuidDelete(detailCSCT?.uuid!)}>
									Xóa
								</Button>
							) : null}
							{detailCSCT?.state !== STATUS_CSCT.APPROVED && (
								<Button p_14_24 rounded_8 blueRedLinear href={`${PATH.CSCTUpdate}?_uuid=${detailCSCT?.uuid}`}>
									Chỉnh sửa
								</Button>
							)}
						</div>
					) : null
				}
			/>
			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin cơ bản</h4>
						<div className={styles.state}>
							<p>Trạng thái:</p>
							<StateActive
								stateActive={detailCSCT?.state!}
								listState={[
									{
										state: STATUS_CSCT.NUMBER_ISSUED,
										text: 'CSCTTT đã cấp số',
										textColor: '#fff',
										backgroundColor: '#005994',
									},
									{
										state: STATUS_CSCT.PENDING_APPROVAL,
										text: 'CSCTTT chờ phê duyệt',
										textColor: '#fff',
										backgroundColor: '#FDAD73',
									},
									{
										state: STATUS_CSCT.APPROVED,
										text: 'CSCTTT đã phê duyệt',
										textColor: '#fff',
										backgroundColor: '#06D7A0',
									},
									{
										state: STATUS_CSCT.REJECTED,
										text: 'CSCTTT bị từ chối',
										textColor: '#fff',
										backgroundColor: '#EE464C',
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.form}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Mã dự án</p>
								<p style={{color: '#005994'}}>{detailCSCT?.project?.code || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên dự án</p>
								<p>{detailCSCT?.project?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Mã cấp số</p>
								<p>{detailCSCT?.code || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày lấy số</p>
								<p>{detailCSCT?.numberingDate ? <Moment date={detailCSCT?.numberingDate} format='DD/MM/YYYY' /> : '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày trên thông báo cấp vốn</p>
								<p>{detailCSCT?.noticeDate ? <Moment date={detailCSCT?.noticeDate} format='DD/MM/YYYY' /> : '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Số lượng hợp đồng</p>
								<p>{detailCSCT?.totalContracts}</p>
							</div>
							<div className={styles.item}>
								<p>Lãnh đạo phụ trách</p>
								<p>{detailCSCT?.user?.fullname || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Cán bộ phụ trách</p>
								<p>{detailCSCT?.project?.leader?.fullname || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày tạo dự án</p>
								<p>
									{detailCSCT?.project?.created ? (
										<Moment date={detailCSCT?.project?.created} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Tổng giá trị thanh toán (VND)</p>
								<p>{convertCoin(detailCSCT?.totalAmount!)}</p>
							</div>
							<div className={styles.item}>
								<p>LKSCTTT theo năm (VND)</p>
								<p>{convertCoin(detailCSCT?.accumAmountInYear!)}</p>
							</div>
							<div className={styles.item}>
								<p>LKSCT đến hiện tại (VND)</p>
								<p>{convertCoin(detailCSCT?.accumAmount!)}</p>
							</div>
						</GridColumn>
					</div>
				</div>
				<div className={clsx(styles.basic_info, styles.mt)}>
					<div className={styles.head}>
						<h4>Danh sách hợp đồng</h4>
					</div>
					<div className={styles.main_table}>
						<DataWrapper loading={isLoading} data={ListPNContract || []}>
							<Table
								data={ListPNContract || []}
								column={[
									{
										title: 'STT',
										render: (data: IContractsPN, index: number) => <>{index + 1}</>,
									},
									{
										title: 'Mã hợp đồng',
										fixedLeft: true,
										render: (data: IContractsPN) => (
											<Tippy content='Chi tiết hợp đồng'>
												<Link href={`${PATH.ProjectContract}/${data?.contract?.uuid}`} className={styles.link}>
													{data?.contract?.code || '---'}
												</Link>
											</Tippy>
										),
									},
									{
										title: 'Tên nhóm nhà thầu',
										render: (data: IContractsPN) => <>{data?.contractor?.contractorCat?.name}</>,
									},
									{
										title: 'Tên nhà thầu',
										render: (data: IContractsPN) => <>{data?.contractor?.contractor?.name || '---'}</>,
									},
									{
										title: 'Giá trị đề nghị thanh toán (VND)',
										render: (data: IContractsPN) => <>{convertCoin(data?.amount)}</>,
									},
									{
										title: 'Loại thanh toán',
										render: (data: IContractsPN) => (
											<>
												{data?.type === 1 && 'Thanh toán'}
												{data?.type === 2 && 'Tạm ứng'}
											</>
										),
									},
									{
										title: 'Ghi chú',
										render: (data: IContractsPN) => (
											<>
												{(data?.note && (
													<Tippy content={data?.note}>
														<p className={styles.note}>{data?.note || '---'}</p>
													</Tippy>
												)) ||
													'---'}
											</>
										),
									},
								]}
							/>
						</DataWrapper>
						<Dialog
							type='error'
							open={!!uuidDelete}
							onClose={() => setUuidDelete('')}
							title={'Xoá CSCT thanh toán'}
							note={'Bạn có chắc chắn muốn xóa CSCT thanh toán này không?'}
							onSubmit={funcDelete.mutate}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainPageDetailCSCT;
