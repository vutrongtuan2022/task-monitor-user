import React, {useContext, useState} from 'react';

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
import TableListWorkChecked from '../TableListWorkChecked';
import {removeVietnameseTones} from '~/common/funcs/optionConvert';
import useDebounce from '~/common/hooks/useDebounce';
import TableListWorkAdditional from '../TableListWorkAdditional';
import IconCustom from '~/components/common/IconCustom';
import {Trash} from 'iconsax-react';

function TableReportWorkCurrent({}: PropsTableReportWorkCurrent) {
	const router = useRouter();

	const {_action} = router.query;

	const {listActivity, projectUuid, setListActivity} = useContext<ICreateReportWork>(CreateReportWork);

	const [keyword, setKeyword] = useState<string>('');
	const [state, setState] = useState<number | null>(null);

	const debounce = useDebounce(keyword, 600);

	return (
		<div className={styles.main_table}>
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search data={keyword} onSetData={setKeyword} placeholder='Tìm kiếm theo tên công việc' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							data={state}
							onSetData={setState}
							listFilter={[
								{
									id: STATE_WORK_PROJECT.NOT_PROCESSED,
									name: 'Chưa xử lý',
								},
								{
									id: STATE_WORK_PROJECT.PROCESSING,
									name: 'Đang xử lý',
								},
							]}
						/>
					</div>
				</div>
				<div className={styles.btn}>
					<Button
						p_10_24
						rounded_8
						light-blue
						disable={!projectUuid}
						icon={<Image alt='icon add' src={icons.iconAdd} width={20} height={20} />}
						onClick={() => {
							router.replace({
								pathname: router.pathname,
								query: {
									...router.query,
									_action: 'create-additional',
								},
							});
						}}
					>
						Công việc phát sinh
					</Button>
					<Button
						p_10_24
						rounded_8
						light-blue
						disable={!projectUuid}
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
				data={listActivity
					?.filter((v) => removeVietnameseTones(v.name)?.includes(debounce ? removeVietnameseTones(debounce) : ''))
					?.filter((x) => state == null || x?.state == state)}
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
								disable={!projectUuid}
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
					data={listActivity
						?.filter((v) => removeVietnameseTones(v.name)?.includes(debounce ? removeVietnameseTones(debounce) : ''))
						?.filter((x) => state == null || x?.state == state)}
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
							title: 'Thuộc nhóm công việc',
							render: (data: IActivityRegister) => (
								<Tippy content={data?.parent?.name || '---'}>
									<p className={styles.group_task}>{data?.parent?.name || '---'}</p>
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
									{data?.isInWorkFlow && 'Có kế hoạch'}
									{!data?.isInWorkFlow && 'Phát sinh'}
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
						{
							title: 'Hành động',
							fixedRight: true,
							render: (data: IActivityRegister, index: number) => (
								<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
									<IconCustom
										type='delete'
										icon={<Trash fontSize={20} fontWeight={600} />}
										tooltip='Xóa bỏ'
										disnable={data.state == STATE_WORK_PROJECT.PROCESSING}
										onClick={() => {
											setListActivity(listActivity?.filter((_v, i) => i != index));
										}}
									/>
								</div>
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
				<TableListWorkChecked
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

			<PositionContainer
				open={_action == 'create-additional'}
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
				<TableListWorkAdditional
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
