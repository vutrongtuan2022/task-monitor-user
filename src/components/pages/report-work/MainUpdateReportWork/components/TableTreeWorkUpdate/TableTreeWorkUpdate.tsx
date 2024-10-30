import React, {useContext, useState} from 'react';

import {PropsTableTreeWorkUpdate} from './interfaces';
import styles from './TableTreeWorkUpdate.module.scss';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import WrapperScrollbar from '~/components/layouts/WrapperScrollbar';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import TreeReportWork from '../../../TreeReportWork';
import {IActivityUpdate} from '../../interfaces';
import {IUpdateReportWork, UpdateReportWork} from '../../context';

function TableTreeWorkUpdate({listTree, onClose}: PropsTableTreeWorkUpdate) {
	const {listActivity, setListActivity} = useContext<IUpdateReportWork>(UpdateReportWork);
	const [selectedNodes, setSelectedNodes] = useState<IActivityUpdate[]>(listActivity);

	console.log(listActivity);

	const findParentNode = (node: IActivityUpdate, nodes: IActivityUpdate[] = listTree): IActivityUpdate | null => {
		for (const currentNode of nodes) {
			if (currentNode.children.some((child) => child.activityUuid === node.activityUuid)) {
				return currentNode;
			}
			const parentFromChild = findParentNode(node, currentNode.children);
			if (parentFromChild) return parentFromChild;
		}
		return null;
	};

	const getChildNodes = (node: IActivityUpdate): IActivityUpdate[] => {
		return node.children.reduce((acc, child) => [...acc, child, ...getChildNodes(child)], [] as IActivityUpdate[]);
	};

	const toggleNode = (node: IActivityUpdate, checked: boolean) => {
		const newSelectedNodes = new Set(selectedNodes);

		const selectNodeAndChildren = (node: IActivityUpdate) => {
			newSelectedNodes.add(node);
			getChildNodes(node).forEach((childNode) => newSelectedNodes.add(childNode));
		};

		const deselectNodeAndChildren = (node: IActivityUpdate) => {
			newSelectedNodes.delete(node);
			getChildNodes(node).forEach((childNode) => newSelectedNodes.delete(childNode));
		};

		const updateParentSelection = (node: IActivityUpdate) => {
			let parent = findParentNode(node);
			while (parent) {
				newSelectedNodes.add(parent);
				parent = findParentNode(parent);
			}
		};

		const removeUnselectedParents = (node: IActivityUpdate) => {
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

		if (checked) {
			selectNodeAndChildren(node);
			updateParentSelection(node);
		} else {
			deselectNodeAndChildren(node);
			removeUnselectedParents(node);
		}

		setSelectedNodes(Array.from(newSelectedNodes) as IActivityUpdate[]);
	};

	const isChecked = (nodeId: string) => selectedNodes.some((selectedNode) => selectedNode.activityUuid === nodeId);

	const handleSaveWorks = () => {
		setListActivity(selectedNodes);
		onClose();
	};

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
							disable={selectedNodes.length == 0}
							icon={<FolderOpen size={18} color='#fff' />}
							onClick={handleSaveWorks}
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
						loading={false}
						noti={<Noti title='Danh sách trống!' des='Danh sách công việc trống!' />}
					>
						{listTree?.map((v: IActivityUpdate, index: number) => (
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

export default TableTreeWorkUpdate;
