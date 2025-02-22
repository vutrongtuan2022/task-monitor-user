import React from 'react';
import styles from './DetailContractor.module.scss';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import {useRouter} from 'next/router';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import contractorServices from '~/services/contractorServices';
import {QUERY_KEY} from '~/constants/config/enum';
import {IDetailContractor, PropsDetailContractor} from './interface';
import GridColumn from '~/components/layouts/GridColumn';
import Tippy from '@tippyjs/react';
import PositionContainer from '~/components/common/PositionContainer';
import UpdateContractor from '../UpdateContractor';
import clsx from 'clsx';
import TabNavLink from '~/components/common/TabNavLink';
import TableParticipating from './component/TableParticipating';
import TableContractorCat from './component/TableContractorCat/TableContractorCat';
import TableContractorCatPending from './component/TableContractorCatPending';

function DetailContractor({}: PropsDetailContractor) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidContractor, _type} = router.query;

	const {data: detailContractor} = useQuery<IDetailContractor>([QUERY_KEY.detail_contractor, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.detailContractor({
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
						title: 'Danh sách nhà thầu',
						path: `${PATH.Contractor}`,
					},
					{
						path: '',
						title: 'Chi tiết nhà thầu',
					},
				]}
				action={
					<div className={styles.group_button}>
						<Button
							p_14_24
							rounded_8
							primaryLinear
							onClick={() => {
								router.replace({
									pathname: router.pathname,
									query: {
										...router.query,
										_uuidContractor: detailContractor?.uuid,
									},
								});
							}}
						>
							Chỉnh sửa
						</Button>
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
								<p>Tên nhà thầu</p>
								<p>{detailContractor?.name}</p>
							</div>
							<div className={styles.item}>
								<p>Số nhóm nhà thầu</p>
								<p>
									{detailContractor?.contractorCat?.length && (
										<Tippy
											content={
												<ol style={{paddingLeft: '16px'}}>
													{[...new Set(detailContractor?.contractorCat?.map((v) => v.name))].map((catName, i) => (
														<li key={i}>{catName}</li>
													))}
												</ol>
											}
										>
											<span className={styles.link_contractor}>
												{[...new Set(detailContractor?.contractorCat?.map((v) => v.name))]?.length || '---'}
											</span>
										</Tippy>
									)}
								</p>
							</div>

							<div className={styles.item}>
								<p>Nhóm nhà thầu đợi duyệt</p>
								<p>
									{detailContractor?.contractorCat?.length && (
										<Tippy
											content={
												<ol style={{paddingLeft: '16px'}}>
													{[...new Set(detailContractor?.contractorCatPending?.map((v) => v.name))].map(
														(catName, i) => (
															<li key={i}>{catName}</li>
														)
													)}
												</ol>
											}
										>
											<span className={styles.link_contractor}>
												{[...new Set(detailContractor?.contractorCatPending?.map((v) => v.name))]?.length || '---'}
											</span>
										</Tippy>
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Ghi chú</p>
								<p>{detailContractor?.note || '---'}</p>
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
									title: 'Tham gia dự án',
								},
								{
									pathname: PATH.ProjectCreate,
									query: 'contractorCat',
									title: 'Thuộc nhóm nhà thầu',
								},
								{
									pathname: PATH.ProjectCreate,
									query: 'contractorCatPending',
									title: 'Nhóm nhà thầu đợi duyệt',
								},
							]}
							listKeyRemove={['_page', '_pageSize', '_keyword', '_state']}
						/>
					</div>
					<div className={styles.line}></div>
					{/* <div className={styles.head}>
						<h4>Danh sách công việc</h4>
					</div> */}
					<div className={styles.main_table}>
						{!_type && <TableParticipating />}
						{_type == 'contractorCat' && <TableContractorCat />}
						{_type == 'contractorCatPending' && <TableContractorCatPending />}
					</div>
				</div>
			</div>
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
		</div>
	);
}

export default DetailContractor;
