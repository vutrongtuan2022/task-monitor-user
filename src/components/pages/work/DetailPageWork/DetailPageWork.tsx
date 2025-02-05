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
import FormUpdateContract from '../FormUpdateContract';
import FormChangeContract from '../FormChangeContract';
import {httpRequest} from '~/services';
import activityServices from '~/services/activityServices';
import FormCancelContract from '../FormCancelContract';
import Dialog from '~/components/common/Dialog';
import TabNavLink from '~/components/common/TabNavLink';
import TableContractHistory from './components/TableContractHistory';
import TableContractAppendices from './components/TableContractAppendices';
import FormAppendicesContract from '../FromAppendicesContract';

function DetailPageWork({}: PropsDetailPageWork) {
	const router = useRouter();

	const {_uuid, _contractChangeUuid, _contractCancelUuid, _contractUuid, _appendicesUuid, _type} = router.query;

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
							{detailActivityContract?.uuid == '' ? null : (
								<Button
									p_14_24
									rounded_8
									primaryLinear
									onClick={() => {
										router.replace({
											pathname: router.pathname,
											query: {
												...router.query,
												_appendicesUuid: detailActivityContract?.contracts?.uuid,
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
												_contractChangeUuid: detailActivityContract?.contracts?.uuid,
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
							_contractCancelUuid: detailActivityContract?.contracts?.uuid,
						},
					});
				}}
			/>

			<PositionContainer
				open={!!_appendicesUuid}
				onClose={() => {
					const {_appendicesUuid, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormAppendicesContract
					nameActivity={detailActivityContract?.name!}
					onClose={() => {
						const {_appendicesUuid, ...rest} = router.query;

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
				open={!!_contractCancelUuid}
				onClose={() => {
					const {_contractCancelUuid, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormCancelContract
					nameActivity={detailActivityContract?.name!}
					onClose={() => {
						const {_contractCancelUuid, ...rest} = router.query;

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
				open={!!_contractChangeUuid}
				onClose={() => {
					const {_contractChangeUuid, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormChangeContract
					nameActivity={detailActivityContract?.name!}
					onClose={() => {
						const {_contractChangeUuid, ...rest} = router.query;

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
