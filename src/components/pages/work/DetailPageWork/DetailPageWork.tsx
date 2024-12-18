import React, {useState} from 'react';
import styles from './DetailPageWork.module.scss';
import {IContractByActivity, IDetailActivityContract, PropsDetailPageWork} from './interface';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import {AddSquare, StopCircle} from 'iconsax-react';
import StateActive from '~/components/common/StateActive';
import {QUERY_KEY, STATE_CONTRACT_WORK, STATUS_CONFIG} from '~/constants/config/enum';
import GridColumn from '~/components/layouts/GridColumn';
import {clsx} from 'clsx';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import {convertCoin} from '~/common/funcs/convertCoin';
import Moment from 'react-moment';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import icons from '~/constants/images/icons';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import PositionContainer from '~/components/common/PositionContainer';
import FormUpdateContract from '../FormUpdateContract';
import FormChangeContract from '../FormChangeContract';
import {httpRequest} from '~/services';
import activityServices from '~/services/activityServices';
import contractsServices from '~/services/contractsServices';
function DetailPageWork({}: PropsDetailPageWork) {
	const router = useRouter();

	const {_page, _pageSize, _uuid, _contractChageUuid, _contractUuid} = router.query;

	const [uuidConfirm, setUuidConfirm] = useState<string>('');
	const [nameActivity, setNameActivity] = useState<string>('');
	const [isFormOpen, setIsFormOpen] = useState(false);

	const {data: detailActivityContract} = useQuery<IDetailActivityContract>([QUERY_KEY.detail_activity_contract, _uuid], {
		queryFn: () =>
			httpRequest({
				http: activityServices.getDetailActivityContract({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const {data: listContractByActivity} = useQuery([QUERY_KEY.table_contract_by_activity, _page, _pageSize, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractsServices.listContractsByActivity({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 10,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const funcConfirmActiviti = () => {
		setUuidConfirm('');
		setIsFormOpen(true);
	};

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.Work,
						title: 'Danh sách công việc cần làm',
					},
					{
						path: '',
						title: 'Chi tiết công việc và hợp đồng',
					},
				]}
				action={
					<div className={styles.group_button}>
						{detailActivityContract?.contracts?.state === STATE_CONTRACT_WORK.PROCESSING && (
							<>
								<Button
									p_14_24
									rounded_8
									blueLinear
									icon={<StopCircle size={18} color='#fff' />}
									onClick={() => {
										setUuidConfirm(detailActivityContract?.contracts?.uuid);
										router.replace({
											pathname: router.pathname,
											query: {
												...router.query,
												_contractChageUuid: detailActivityContract?.contracts?.uuid,
											},
										});
									}}
								>
									Kết thúc hợp đồng
								</Button>
								<Button
									p_14_24
									rounded_8
									primaryLinear
									onClick={() => {
										router.replace({
											pathname: router.pathname,
											query: {
												...router.query,
												_contractUuid: detailActivityContract?.contracts?.uuid,
											},
										});
									}}
								>
									Chỉnh sửa
								</Button>
							</>
						)}

						{(detailActivityContract?.contracts?.state === STATE_CONTRACT_WORK.EXPIRED ||
							detailActivityContract?.contracts?.state === STATE_CONTRACT_WORK.END) && (
							<Button
								p_14_24
								rounded_8
								green
								icon={<AddSquare size={18} color='#fff' />}
								onClick={() => {
									setNameActivity(detailActivityContract?.name);
									setIsFormOpen(true);
									router.replace({
										pathname: router.pathname,
										query: {
											...router.query,
											_contractChageUuid: detailActivityContract?.contracts?.uuid,
										},
									});
								}}
							>
								Thay thế hợp đồng
							</Button>
						)}
					</div>
				}
			/>
			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin cơ bản</h4>
						<div className={styles.state}>
							<p>Trạng thái hợp đồng:</p>
							<StateActive
								stateActive={detailActivityContract?.contracts?.state!}
								listState={[
									{
										state: STATE_CONTRACT_WORK.EXPIRED,
										text: 'Hết hạn',
										textColor: '#fff',
										backgroundColor: '#16C1F3',
									},
									{
										state: STATE_CONTRACT_WORK.PROCESSING,
										text: 'Đang thực hiện',
										textColor: '#fff',

										backgroundColor: '#06D7A0',
									},
									{
										state: STATE_CONTRACT_WORK.END,
										text: 'Đã hủy',
										textColor: '#fff',
										backgroundColor: '#F37277',
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.progress_group}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Tên công trình</p>
								<p>{detailActivityContract?.project?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên công việc</p>
								<p>{detailActivityContract?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Hợp đồng hiện tại</p>
								<p style={{color: '#2970FF'}}>{detailActivityContract?.contracts?.code || '---'}</p>
							</div>
						</GridColumn>
					</div>
				</div>
				<div className={clsx(styles.basic_info, styles.mt)}>
					<div className={styles.head}>
						<h4>Lịch sử hợp đồng công việc</h4>
					</div>
					<WrapperScrollbar>
						<DataWrapper
							data={listContractByActivity?.items || []}
							loading={listContractByActivity?.isLoading}
							noti={<Noti title='Danh sách hợp đồng trống!' des='Hiện tại chưa có hợp đồng nào!' />}
						>
							<Table
								fixedHeader={true}
								data={listContractByActivity?.items || []}
								column={[
									{
										title: 'STT',
										render: (data: IContractByActivity, index: number) => <>{index + 1}</>,
									},
									{
										title: 'Số hợp đồng',
										fixedLeft: true,
										render: (data: IContractByActivity) => (
											<Tippy content='Chi tiết hợp đồng'>
												<Link href={`${PATH.ContractReportDisbursement}/${data?.uuid}`} className={styles.link}>
													{data?.code}
												</Link>
											</Tippy>
										),
									},
									{
										title: 'Giá trị hợp đồng (VND)',
										render: (data: IContractByActivity) => <>{convertCoin(data?.amount)}</>,
									},
									{
										title: 'Ngày ký hợp đồng',
										render: (data: IContractByActivity) => (
											<>{data?.startDate ? <Moment date={data?.startDate} format='DD/MM/YYYY' /> : '---'}</>
										),
									},
									{
										title: 'Ngày THHĐ',
										render: (data: IContractByActivity) => <>{data?.totalDayAdvantage}</>,
									},
									{
										title: 'Nhóm nhà  thầu',
										render: (data: IContractByActivity) => <>{data?.contractor?.contractorCat?.name}</>,
									},
									{
										title: 'Tên nhà thầu',
										render: (data: IContractByActivity) => <>{data?.contractor?.name}</>,
									},
									{
										title: 'Giá trị BLTHHĐ (VND) ',
										render: (data: IContractByActivity) => <>{convertCoin(data?.contractExecution?.amount)}</>,
									},
									{
										title: 'Ngày kết thúc BLTHHĐ',
										render: (data: IContractByActivity) =>
											data?.contractExecution?.endDate ? (
												<Moment date={data?.contractExecution?.endDate} format='DD/MM/YYYY' />
											) : (
												'---'
											),
									},
									{
										title: 'Giá trị BLTƯ (VND)',
										render: (data: IContractByActivity) => <>{convertCoin(data?.advanceGuarantee?.amount)}</>,
									},
									{
										title: 'Ngày kết thúc BLTƯ',
										render: (data: IContractByActivity) =>
											data?.advanceGuarantee?.endDate ? (
												<Moment date={data?.advanceGuarantee?.endDate} format='DD/MM/YYYY' />
											) : (
												'---'
											),
									},
									{
										title: 'Trạng thái',
										render: (data: IContractByActivity) => (
											<StateActive
												stateActive={data?.state}
												listState={[
													{
														state: STATE_CONTRACT_WORK.EXPIRED,
														text: 'Hết hạn',
														textColor: '#fff',
														backgroundColor: '#16C1F3',
													},
													{
														state: STATE_CONTRACT_WORK.PROCESSING,
														text: 'Đang thực hiện',
														textColor: '#fff',

														backgroundColor: '#06D7A0',
													},
													{
														state: STATE_CONTRACT_WORK.END,
														text: 'Đã hủy',
														textColor: '#fff',
														backgroundColor: '#F37277',
													},
												]}
											/>
										),
									},
								]}
							/>
						</DataWrapper>
						<Pagination
							currentPage={Number(_page) || 1}
							pageSize={Number(_pageSize) || 10}
							total={listContractByActivity?.pagination?.totalCount}
							dependencies={[_pageSize, _uuid]}
						/>
					</WrapperScrollbar>
				</div>
			</div>
			<Dialog
				type='primary'
				open={!!uuidConfirm}
				icon={icons.question_1}
				onClose={() => setUuidConfirm('')}
				title={'Xác nhận kết thúc'}
				note={'Bạn có chắc chắn muốn kết thúc hợp đồng này không? Nếu kết thúc hợp đồng thì phải thêm hợp đồng mới'}
				onSubmit={funcConfirmActiviti}
			/>

			<PositionContainer
				open={isFormOpen}
				onClose={() => {
					setIsFormOpen(false);
					const {_contractChageUuid, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormChangeContract
					nameActivity={nameActivity}
					onClose={() => {
						setIsFormOpen(false);
						const {_contractChageUuid, ...rest} = router.query;

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
				open={!!_contractUuid}
				onClose={() => {
					const {_contractUuid, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormUpdateContract
					onClose={() => {
						const {_contractUuid, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>
		</div>
	);
}

export default DetailPageWork;
