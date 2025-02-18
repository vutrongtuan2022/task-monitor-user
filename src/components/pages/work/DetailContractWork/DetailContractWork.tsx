import React from 'react';

import {IDetailContract, PropsDetailContractWork} from './interfaces';
import styles from './DetailContractWork.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import GridColumn from '~/components/layouts/GridColumn';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, STATE_CONTRACT_WORK} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import contractsServices from '~/services/contractsServices';
import {convertCoin} from '~/common/funcs/convertCoin';
import Progress from '~/components/common/Progress';
import Moment from 'react-moment';
import clsx from 'clsx';
import StateActive from '~/components/common/StateActive';
import PositionContainer from '~/components/common/PositionContainer';
import FormUpdateContract from './FormUpdateContract';
import Tippy from '@tippyjs/react';
import TableContractFund from './components/TableContractFund';
import TabNavLink from '~/components/common/TabNavLink';
import TableContractors from './components/TableContractors';

function DetailContractWork({}: PropsDetailContractWork) {
	const router = useRouter();

	const {_uuid, _action, _uuidWork, _type} = router.query;

	const {data: detailContract} = useQuery<IDetailContract>([QUERY_KEY.detail_contract], {
		queryFn: () =>
			httpRequest({
				http: contractsServices.detailContracts({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	return (
		<div className={styles.container}>
			<Breadcrumb
				listUrls={[
					{
						path: PATH.Work,
						title: 'Danh sách công việc cần làm',
					},
					{
						path: `${PATH.Work}/${_uuidWork}`,
						title: 'Chi tiết công việc',
					},
					{
						path: '',
						title: 'Chi tiết hợp đồng',
					},
				]}
				action={
					<div className={styles.group_button}>
						{detailContract?.state === STATE_CONTRACT_WORK.PROCESSING && (
							<Button
								p_14_24
								rounded_8
								primaryLinear
								onClick={() => {
									router.replace({
										pathname: router.pathname,
										query: {
											...router.query,
											_action: 'update',
										},
									});
								}}
							>
								Chỉnh sửa
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
								stateActive={detailContract?.state!}
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
								<p>Số hợp đồng</p>
								<p>{detailContract?.code || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Lũy kế giải ngân trong năm</p>
								<p>{convertCoin(detailContract?.accumAmountThisYear!)}</p>
							</div>
							<div className={styles.item}>
								<p>Lũy kế giải ngân hiện tại</p>
								<p>
									<span style={{color: '#EE464C'}}>{convertCoin(detailContract?.accumAmount!)}</span> /{' '}
									<span>{convertCoin(detailContract?.amount!)}</span>
								</p>
							</div>
							<div className={styles.item}>
								<p>Tiến độ giải ngân</p>

								<Progress percent={detailContract?.progress!} width={80} />
							</div>
							<div className={styles.item}>
								<p>Tên công trình</p>
								<p>{detailContract?.projectDTO?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên công việc</p>
								<p>{detailContract?.activityDTO?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Số nhóm nhà thầu</p>
								<p>
									{detailContract?.contractorInfos?.length && (
										<Tippy
											content={
												<ol style={{paddingLeft: '16px'}}>
													{[...new Set(detailContract?.contractorInfos?.map((v) => v.contractorCatName))].map(
														(catName, i) => (
															<li key={i}>{catName}</li>
														)
													)}
												</ol>
											}
										>
											<span className={styles.link_contractor}>
												{[...new Set(detailContract?.contractorInfos?.map((v) => v.contractorCatName))]?.length ||
													'---'}
											</span>
										</Tippy>
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Số nhà thầu</p>
								<p>
									{detailContract?.contractorInfos?.length && (
										<Tippy
											content={
												<ol style={{paddingLeft: '16px'}}>
													{[...new Set(detailContract?.contractorInfos?.map((v) => v.contractorName))].map(
														(catName, i) => (
															<li key={i}>{catName}</li>
														)
													)}
												</ol>
											}
										>
											<span className={styles.link_contractor}>
												{[...new Set(detailContract?.contractorInfos?.map((v) => v.contractorName))]?.length ||
													'---'}
											</span>
										</Tippy>
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Ngày ký hợp đồng</p>
								<p>{detailContract?.startDate ? <Moment date={detailContract?.startDate} format='DD/MM/YYYY' /> : '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Giá trị hợp đồng</p>
								<p>{convertCoin(detailContract?.amount!) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Thời gian THHĐ</p>
								<p>{detailContract?.totalDayAdvantage}</p>
							</div>
							<div className={styles.item}>
								<p>Giá trị BLTHHĐ</p>
								<p>{convertCoin(detailContract?.contractExecution?.amount!) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày kết thúc BLTHHĐ</p>
								<p>
									{detailContract?.contractExecution?.endDate ? (
										<Moment date={detailContract?.contractExecution?.endDate} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Giá trị BLTƯ</p>
								<p>{convertCoin(detailContract?.advanceGuarantee?.amount!) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày kết thúc BLTƯ</p>
								<p>
									{detailContract?.advanceGuarantee?.endDate ? (
										<Moment date={detailContract?.advanceGuarantee?.endDate} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Người tạo hợp đồng</p>
								<p>{detailContract?.creator?.fullname || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Thời gian tạo</p>
								<p>{detailContract?.created ? <Moment date={detailContract?.created} format='DD/MM/YYYY' /> : '---'}</p>
							</div>
						</GridColumn>
					</div>
				</div>

				<div className={clsx(styles.basic_info, styles.mt)}>
					<div className={styles.main_tab}>
						<TabNavLink
							query='_type'
							listHref={[
								{
									pathname: PATH.ProjectCreate,
									query: null,
									title: 'Danh sách giải ngân',
								},
								{
									pathname: PATH.ProjectCreate,
									query: 'contractor',
									title: 'Danh sách nhà thầu',
								},
							]}
							listKeyRemove={['_page', '_pageSize', '_keyword', '_state']}
						/>
					</div>
					<div className={styles.line}></div>
					<div className={styles.main_table}>
						{!_type && <TableContractFund />}
						{_type == 'contractor' && <TableContractors />}
					</div>
				</div>
			</div>

			<PositionContainer
				open={_action == 'update'}
				onClose={() => {
					const {_action, ...rest} = router.query;

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
						const {_action, ...rest} = router.query;

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

export default DetailContractWork;
