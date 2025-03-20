import React, {useContext, useState} from 'react';

import {PropsTableWorkCurrentCreate} from './interfaces';
import styles from './TableWorkCurrentCreate.module.scss';
import {CreateReportWork, ICreateReportWork} from '../../context';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import {QUERY_KEY, STATE_WORK} from '~/constants/config/enum';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Tippy from '@tippyjs/react';
import StateActive from '~/components/common/StateActive';
import Button from '~/components/common/Button';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import PositionContainer from '~/components/common/PositionContainer';
import {useRouter} from 'next/router';
import TableTreeWorkCreate from '../TableTreeWorkCreate';
import {removeVietnameseTones} from '~/common/funcs/optionConvert';
import useDebounce from '~/common/hooks/useDebounce';
import IconCustom from '~/components/common/IconCustom';
import {Trash} from 'iconsax-react';
import {IActivityRegister} from '../../interfaces';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import activityServices from '~/services/activityServices';
import TableWorkAdditionalCreate from '../TableWorkAdditionalCreate';

function TableWorkCurrentCreate({}: PropsTableWorkCurrentCreate) {
	const router = useRouter();

	const {_action} = router.query;

	const {listActivity, projectUuid, setListActivity} = useContext<ICreateReportWork>(CreateReportWork);

	const [keyword, setKeyword] = useState<string>('');
	const [state, setState] = useState<number | null>(null);

	const debounce = useDebounce(keyword, 600);

	const {data: listTree} = useQuery([QUERY_KEY.table_tree_work_project, projectUuid], {
		queryFn: () =>
			httpRequest({
				http: activityServices.treeActivitiesForRegister({
					projectUuid: projectUuid,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!projectUuid,
	});

	const findParentNode = (node: IActivityRegister, nodes: IActivityRegister[] = listTree): IActivityRegister | null => {
		for (const currentNode of nodes) {
			if (currentNode.children.some((child) => child.activityUuid === node.activityUuid)) {
				return currentNode;
			}
			const parentFromChild = findParentNode(node, currentNode.children);
			if (parentFromChild) return parentFromChild;
		}
		return null;
	};

	const getChildNodes = (node: IActivityRegister): IActivityRegister[] => {
		return node.children.reduce((acc, child) => [...acc, child, ...getChildNodes(child)], [] as IActivityRegister[]);
	};

	const deleteActivityFromList = (node: IActivityRegister, index: number) => {
		// Xóa công việc phát sinh ==> Xóa theo index.
		if (!node.activityUuid) {
			return setListActivity(listActivity?.filter((_v, i) => i != index));
		}

		const newSelectedNodes = new Set(listActivity);

		// Xóa công việc trong cây ==> Xóa node theo uuid trong cây.
		const deselectNodeAndChildren = (node: IActivityRegister) => {
			newSelectedNodes.delete(node);
			getChildNodes(node).forEach((childNode) => newSelectedNodes.delete(childNode));
		};

		const removeUnselectedParents = (node: IActivityRegister) => {
			let parent = findParentNode(node);

			while (parent) {
				const parentChildren = parent.children;
				const hasSelectedChild = parentChildren.some((child) => newSelectedNodes.has(child));
				if (!hasSelectedChild) {
					newSelectedNodes.delete(parent);
				}
				parent = findParentNode(parent);
			}
		};

		deselectNodeAndChildren(node);
		removeUnselectedParents(node);

		return setListActivity(Array.from(newSelectedNodes) as IActivityRegister[]);
	};

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
									id: STATE_WORK.NOT_PROCESSED,
									name: 'Chưa xử lý',
								},
								{
									id: STATE_WORK.PROCESSING,
									name: 'Đang xử lý',
								},
								{
									id: STATE_WORK.COMPLETED,
									name: 'Đã hoàn thành',
								},
								{
									id: STATE_WORK.REJECTED,
									name: 'Bị từ chối',
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
						Công việc kế hoạch
					</Button>
				</div>
			</div>
			<DataWrapper
				data={listActivity
					?.filter((v) => v?.activityUuid != '1' && v?.activityUuid != '2' && v?.activityUuid != '3')
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
								Công việc kế hoạch
							</Button>
						}
					/>
				}
			>
				<Table
					data={listActivity
						?.filter((v) => v?.activityUuid != '1' && v?.activityUuid != '2' && v?.activityUuid != '3') // Không lấy những activity là giai đoạn (I, II, III)
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
									<p
										className={styles.name}
										style={{color: data?.megaType == 'Task' ? '#2970FF' : data?.megaType ? '' : ''}}
									>
										{data?.name || '---'}
									</p>
								</Tippy>
							),
						},
						{
							title: 'Thuộc nhóm công việc',
							render: (data: IActivityRegister) => (
								<Tippy content={data?.parent?.name || '---'}>
									<p
										className={styles.group_task}
										style={{color: data?.megaType == 'Task' ? '#2970FF' : data?.megaType ? '' : ''}}
									>
										{data?.parent?.name || '---'}
									</p>
								</Tippy>
							),
						},
						{
							title: 'Giai đoạn thực hiện',
							render: (data: IActivityRegister) => (
								<p style={{color: data?.megaType == 'Task' ? '#2970FF' : data?.megaType ? '' : ''}}>
									{data?.stage == -1 && '---'}
									{data?.stage == 1 && 'Giai đoạn chuẩn bị đầu tư'}
									{data?.stage == 2 && 'Giai đoạn thực hiện đầu tư'}
									{data?.stage == 3 && 'Giai đoạn kết thúc đầu tư'}
								</p>
							),
						},
						{
							title: 'Loại công việc',
							render: (data: IActivityRegister) => (
								<p style={{color: data?.megaType == 'Task' ? '#2970FF' : data?.megaType ? '' : ''}}>
									{(data?.isInWorkFlow == null || data?.isInWorkFlow == true) && 'Có kế hoạch'}
									{data?.isInWorkFlow == false && 'Phát sinh'}
								</p>
							),
						},
						{
							title: 'Megatype',
							render: (data: IActivityRegister) => (
								<p style={{color: data?.megaType == 'Task' ? '#2970FF' : data?.megaType ? '' : ''}}>
									{data?.megaType || '---'}
								</p>
							),
						},
						{
							title: 'Trạng thái',
							render: (data: IActivityRegister) => (
								<StateActive
									stateActive={data?.state}
									listState={[
										{
											state: STATE_WORK.NOT_PROCESSED,
											text: 'Chưa xử lý',
											textColor: '#FFFFFF',
											backgroundColor: '#FDAD73',
										},
										{
											state: STATE_WORK.PROCESSING,
											text: 'Đang xử lý',
											textColor: '#FFFFFF',
											backgroundColor: '#5B70B3',
										},
										{
											state: STATE_WORK.COMPLETED,
											text: 'Đã hoàn thành',
											textColor: '#FFFFFF',
											backgroundColor: '#16C1F3',
										},
										{
											state: STATE_WORK.REJECTED,
											text: 'Bị từ chối',
											textColor: '#FFFFFF',
											backgroundColor: '#EE464C',
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
										// disnable={data.state == STATE_WORK.PROCESSING}
										onClick={() => {
											deleteActivityFromList(data, index);
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
				<TableTreeWorkCreate
					listTree={listTree || []}
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
				<TableWorkAdditionalCreate
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

export default TableWorkCurrentCreate;
