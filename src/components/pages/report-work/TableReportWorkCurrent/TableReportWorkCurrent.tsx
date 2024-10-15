import React, {useContext} from 'react';

import {PropsTableReportWorkCurrent} from './interfaces';
import styles from './TableReportWorkCurrent.module.scss';
import {CreateReportWork, ICreateReportWork} from '../context';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import {STATE_WORK_PROJECT} from '~/constants/config/enum';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import {IActivityRegister} from '../MainCreateReportWork/interfaces';
import Tippy from '@tippyjs/react';
import StateActive from '~/components/common/StateActive';
import Button from '~/components/common/Button';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import PositionContainer from '~/components/common/PositionContainer';
import {useRouter} from 'next/router';
import TableListWork from '../TableListWork';

function TableReportWorkCurrent({}: PropsTableReportWorkCurrent) {
	const router = useRouter();

	const {_action} = router.query;

	const {listActivity} = useContext<ICreateReportWork>(CreateReportWork);

	return (
		<div className={styles.main_table}>
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên công việc' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_state'
							listFilter={[
								{
									id: STATE_WORK_PROJECT.NOT_PROCESSED,
									name: 'Chưa xử lý',
								},
								{
									id: STATE_WORK_PROJECT.PROCESSING,
									name: 'Đang xử lý',
								},
								{
									id: STATE_WORK_PROJECT.COMPLETED,
									name: 'Đã hoàn thành',
								},
							]}
						/>
					</div>
				</div>
				<div className={styles.btn}>
					<Button p_10_24 rounded_8 light-blue icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}>
						Công việc phát sinh
					</Button>
					<Button
						p_10_24
						rounded_8
						light-blue
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
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
						Chọn công việc
					</Button>
				</div>
			</div>
			<DataWrapper
				data={listActivity}
				loading={false}
				noti={
					<Noti
						title='Dữ liệu trống!'
						des='Hiện tại chưa có công việc cho báo cáo hiện tại!'
						button={
							<Button
								p_10_24
								rounded_8
								light-blue
								icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
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
								Chọn công việc
							</Button>
						}
					/>
				}
			>
				<Table
					data={listActivity}
					column={[
						{
							title: 'STT',
							render: (data: IActivityRegister, index: number) => <>{index + 1}</>,
						},
						{
							title: 'Tên công việc',
							render: (data: IActivityRegister) => (
								<Tippy content={data?.name}>
									<p className={styles.name}>{data?.name || '---'}</p>
								</Tippy>
							),
						},
						{
							title: 'Giai đoạn thực hiện',
							render: (data: IActivityRegister) => (
								<>
									{data?.stage == -1 && '---'}
									{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
									{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
									{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư'}
								</>
							),
						},

						{
							title: 'Loại công việc',
							render: (data: IActivityRegister) => (
								<>
									{data?.isInWorkFlow && 'Phát sinh'}
									{!data?.isInWorkFlow && 'Có kế hoạch'}
								</>
							),
						},
						{
							title: 'Megatype',
							render: (data: IActivityRegister) => <>{data?.megaType || '---'}</>,
						},
						{
							title: 'Trạng thái',
							render: (data: IActivityRegister) => (
								<StateActive
									stateActive={data?.state}
									listState={[
										{
											state: STATE_WORK_PROJECT.NOT_PROCESSED,
											text: 'Chưa xử lý',
											textColor: '#FFFFFF',
											backgroundColor: '#FDAD73',
										},
										{
											state: STATE_WORK_PROJECT.PROCESSING,
											text: 'Đang xử lý',
											textColor: '#FFFFFF',
											backgroundColor: '#16C1F3',
										},
										{
											state: STATE_WORK_PROJECT.COMPLETED,
											text: 'Đã hoàn thành',
											textColor: '#FFFFFF',
											backgroundColor: '#06D7A0',
										},
									]}
								/>
							),
						},
					]}
				/>
			</DataWrapper>

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
				<TableListWork
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

export default TableReportWorkCurrent;
