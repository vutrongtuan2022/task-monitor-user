import React, {useState} from 'react';
import styles from './DetailPageWork.module.scss';
import {IDetailActivityContract, PropsDetailPageWork} from './interface';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import {QUERY_KEY, STATE_CONTRACT_WORK} from '~/constants/config/enum';
import GridColumn from '~/components/layouts/GridColumn';
import {clsx} from 'clsx';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import PositionContainer from '~/components/common/PositionContainer';
import {httpRequest} from '~/services';
import activityServices from '~/services/activityServices';
import Dialog from '~/components/common/Dialog';
import TabNavLink from '~/components/common/TabNavLink';
import TableContractHistory from './components/TableContractHistory';
import TableContractAppendices from './components/TableContractAppendices';

import FormCreateContract from '~/components/utils/FormCreateContract';
import FormUpdateContract from '~/components/utils/FormUpdateContract';
import FormCancelContract from '~/components/utils/FormCancelContract';
import FormChangeContract from '~/components/utils/FormChangeContract';
import FromCreateContractAddendum from '~/components/utils/FromCreateContractAddendum';

function DetailPageWork({}: PropsDetailPageWork) {
	const router = useRouter();

	const {_uuid, _action, _type, _contractUuid} = router.query;

	const [openCancelContract, setOpenCancelContract] = useState<boolean>(false);

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
						title: 'Chi tiết công việc',
					},
				]}
				action={
					<div className={styles.group_button}>
						<>
							{detailActivityContract?.contracts == null && (
								<Button
									p_14_24
									rounded_8
									primaryLinear
									onClick={() => {
										router.replace({
											pathname: router.pathname,
											query: {
												...router.query,
												_action: 'create',
											},
										});
									}}
								>
									Thêm mới hợp đồng
								</Button>
							)}
						</>
						<>
							{!!detailActivityContract?.contracts && (
								<Button
									p_14_24
									rounded_8
									primaryLinear
									onClick={() => {
										router.replace({
											pathname: router.pathname,
											query: {
												...router.query,
												_action: 'create-contract-addendum',
											},
										});
									}}
								>
									Thêm phụ lục hợp đồng
								</Button>
							)}
						</>
						{detailActivityContract?.contracts?.state === STATE_CONTRACT_WORK.PROCESSING && (
							<>
								<Button p_14_24 rounded_8 blueLinear onClick={() => setOpenCancelContract(true)}>
									Kết thúc hợp đồng
								</Button>
								<Button
									p_14_24
									rounded_8
									blueRedLinear
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
									Chỉnh sửa hợp đồng
								</Button>
							</>
						)}

						{(detailActivityContract?.contracts?.state === STATE_CONTRACT_WORK.EXPIRED ||
							detailActivityContract?.contracts?.state === STATE_CONTRACT_WORK.END) && (
							<>
								<Button
									p_14_24
									rounded_8
									green
									onClick={() => {
										router.replace({
											pathname: router.pathname,
											query: {
												...router.query,
												_action: 'change-contract',
											},
										});
									}}
								>
									Thay thế hợp đồng
								</Button>
								<Button
									p_14_24
									rounded_8
									blueRedLinear
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
									Chỉnh sửa hợp đồng
								</Button>
							</>
						)}
					</div>
				}
			/>
			<div className={styles.main}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin cơ bản</h4>
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
								<p>Chi nhánh</p>
								<p>
									<span>{detailActivityContract?.project?.branch?.code || '---'}</span> -
									<span style={{marginLeft: '4px'}}>{detailActivityContract?.project?.branch?.name || '---'}</span>
								</p>
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
									title: 'Lịch sử hợp đồng chính',
								},
								{
									pathname: PATH.ProjectCreate,
									query: 'appendices',
									title: 'Danh sách phụ lục hợp đồng',
								},
							]}
							listKeyRemove={['_page', '_pageSize', '_keyword', '_state']}
						/>
					</div>
					<div className={styles.line}></div>
					<div className={styles.main_table}>
						{!_type && <TableContractHistory />}
						{_type == 'appendices' && <TableContractAppendices />}
					</div>
				</div>
			</div>

			<Dialog
				type='error'
				open={openCancelContract}
				title='Kết thúc hợp đồng'
				note={
					<span>
						Bạn có chắn chắn muốn kết thúc hợp đồng không? <br />
						Nếu kết thúc hợp đồng thì phải thêm hợp đồng mới!
					</span>
				}
				titleCancel='Hủy bỏ'
				titleSubmit='Thêm mới hợp đồng'
				onClose={() => setOpenCancelContract(false)}
				onSubmit={() => {
					setOpenCancelContract(false);
					router.replace({
						pathname: router.pathname,
						query: {
							...router.query,
							_action: 'cancel-contract',
						},
					});
				}}
			/>

			{/* Thêm phụ lục hợp đồng */}
			<PositionContainer
				open={_action == 'create-contract-addendum'}
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
				<FromCreateContractAddendum
					uuidActivity={_uuid as string}
					uuidContract={detailActivityContract?.contracts?.uuid!}
					queryKeys={[
						QUERY_KEY.detail_activity_contract,
						QUERY_KEY.table_contract_by_appendices,
						QUERY_KEY.table_contract_by_activity,
					]}
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

			{/* Kết thúc hợp đồng */}
			<PositionContainer
				open={_action == 'cancel-contract'}
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
				<FormCancelContract
					uuidActivity={_uuid as string}
					uuidContract={detailActivityContract?.contracts?.uuid!}
					nameActivity={detailActivityContract?.name!}
					queryKeys={[
						QUERY_KEY.detail_activity_contract,
						QUERY_KEY.table_contract_by_appendices,
						QUERY_KEY.table_contract_by_activity,
					]}
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

			{/* Thay thế hợp đồng */}
			<PositionContainer
				open={_action == 'change-contract'}
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
				<FormChangeContract
					uuidActivity={_uuid as string}
					uuidContract={detailActivityContract?.contracts?.uuid!}
					nameActivity={detailActivityContract?.name!}
					queryKeys={[
						QUERY_KEY.detail_activity_contract,
						QUERY_KEY.table_contract_by_appendices,
						QUERY_KEY.table_contract_by_activity,
					]}
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

			{/* Thêm mới hợp đồng */}
			<PositionContainer
				open={_action == 'create'}
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
				<FormCreateContract
					uuidActivity={_uuid as string}
					nameActivity={detailActivityContract?.name!}
					queryKeys={[
						QUERY_KEY.detail_activity_contract,
						QUERY_KEY.table_contract_by_appendices,
						QUERY_KEY.table_contract_by_activity,
					]}
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

			{/* Chỉnh sửa hợp đồng */}
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
					uuidContract={_contractUuid as string}
					queryKeys={[
						QUERY_KEY.detail_activity_contract,
						QUERY_KEY.table_contract_by_appendices,
						QUERY_KEY.table_contract_by_activity,
					]}
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
