import React, {useContext, useState} from 'react';

import {ITreeCreateReport, PropsTableListWorkChecked} from './interfaces';
import styles from './TableListWorkChecked.module.scss';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import {QUERY_KEY} from '~/constants/config/enum';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import activityServices from '~/services/activityServices';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {CreateReportWork, ICreateReportWork} from '../context';
import TreeReportWork from '../TreeReportWork';

function TableListWorkChecked({onClose}: PropsTableListWorkChecked) {
	const {projectUuid} = useContext<ICreateReportWork>(CreateReportWork);
	const [selectedNodes, setSelectedNodes] = useState<ITreeCreateReport[]>([]);

	const {data: listTree, isLoading} = useQuery([QUERY_KEY.table_tree_work_project, projectUuid], {
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

	const findParentNode = (node: ITreeCreateReport, nodes: ITreeCreateReport[] = listTree): ITreeCreateReport | null => {
		for (const currentNode of nodes) {
			if (currentNode.children.some((child) => child.activityUuid === node.activityUuid)) {
				return currentNode;
			}
			const parentFromChild = findParentNode(node, currentNode.children);
			if (parentFromChild) return parentFromChild;
		}
		return null;
	};

	const getChildNodes = (node: ITreeCreateReport): ITreeCreateReport[] => {
		return node.children.reduce((acc, child) => [...acc, child, ...getChildNodes(child)], [] as ITreeCreateReport[]);
	};

	const toggleNode = (node: ITreeCreateReport, checked: boolean) => {
		const newSelectedNodes = new Set(selectedNodes);

		const selectNodeAndChildren = (node: ITreeCreateReport) => {
			newSelectedNodes.add(node);
			getChildNodes(node).forEach((childNode) => newSelectedNodes.add(childNode));
		};

		const deselectNodeAndChildren = (node: ITreeCreateReport) => {
			newSelectedNodes.delete(node);
			getChildNodes(node).forEach((childNode) => newSelectedNodes.delete(childNode));
		};

		const updateParentSelection = (node: ITreeCreateReport) => {
			let parent = findParentNode(node);

			while (parent) {
				newSelectedNodes.add(parent);
				parent = findParentNode(parent);
			}
		};

		if (checked) {
			selectNodeAndChildren(node);
			updateParentSelection(node);
		} else {
			deselectNodeAndChildren(node);
		}

		setSelectedNodes(Array.from(newSelectedNodes) as ITreeCreateReport[]);
	};

	const isChecked = (nodeId: string) => selectedNodes.some((selectedNode) => selectedNode.activityUuid === nodeId);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h4 className={styles.title}>Chọn công việc báo cáo</h4>
				<div className={styles.group_button}>
					<div>
						<Button p_12_20 grey rounded_6 onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>

					<div className={styles.btn}>
						<Button
							p_12_20
							primary
							rounded_6
							// disable={listWorkChecked.length == 0}
							icon={<FolderOpen size={18} color='#fff' />}
							// onClick={handleSaveWorks}
						>
							Lưu lại
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.line}></div>
			<div className={styles.form}>
				<WrapperScrollbar isWrappreTable={false}>
					<DataWrapper
						data={listTree || []}
						loading={isLoading}
						noti={<Noti title='Danh sách trống!' des='Danh sách công việc trống!' />}
					>
						{listTree?.map((v: ITreeCreateReport, index: number) => (
							<TreeReportWork
								key={index}
								activity={v}
								index={index}
								level={1}
								isChecked={isChecked}
								toggleNode={toggleNode}
							/>
						))}
					</DataWrapper>
				</WrapperScrollbar>
			</div>
		</div>
	);
}

export default TableListWorkChecked;
