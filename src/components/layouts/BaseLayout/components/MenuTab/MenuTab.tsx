import {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import Link from 'next/link';
import clsx from 'clsx';
import TippyHeadless from '@tippyjs/react/headless';

import {RootState} from '~/redux/store';
import {ContextBaseLayout} from '../../BaseLayout';
import {TContextBaseLayout} from '../../interfaces';
import {IMenuItem, Menu, PATH} from '~/constants/config';
import ImageFill from '~/components/common/ImageFill';
import icons from '~/constants/images/icons';

import styles from './MenuTab.module.scss';
import {ArrowRight2} from 'iconsax-react';
import type {Instance} from 'tippy.js';
import {TYPE_SPECIAL} from '~/constants/config/enum';

function MenuTab() {
	const router = useRouter();
	const {isMobile} = useSelector((state: RootState) => state.site);
	const context = useContext<TContextBaseLayout>(ContextBaseLayout);
	const tippyRef = useRef<Instance | null>(null);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

	const toggleGroup = (title: string) => {
		setOpenGroups((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	};

	const checkActive = useCallback(
		(path?: string) => {
			if (!path) return false;
			const currentFirstSegment = router.pathname.split('/')[1];
			const pathFirstSegment = path.split('/')[1];
			return currentFirstSegment === pathFirstSegment;
		},
		[router.pathname]
	);

	const checkGroupActive = useCallback(
		(children: (typeof Menu)[number]['children']) => {
			if (!children) return false;
			return children.some((child) => checkActive(child.pathActive ?? child.path));
		},
		[checkActive]
	);

	const menus = useMemo(() => {
		if (!infoUser) return [];

		const isSenior = infoUser?.special === TYPE_SPECIAL.SENIOR;

		const filterMenu = (menuList: IMenuItem[]): IMenuItem[] => {
			return menuList
				.map((item) => {
					if (item.children && item.children.length > 0) {
						const filteredChildren = filterMenu(item.children);

						if (filteredChildren.length > 0) {
							return {
								...item,
								children: filteredChildren,
							};
						}

						if (
							(isSenior && item.isSpecial !== TYPE_SPECIAL.CONFIRM_CONTRACTOR) ||
							(!isSenior && (item.isSpecial === TYPE_SPECIAL.NORMAL || item.isSpecial === TYPE_SPECIAL.CONFIRM_CONTRACTOR))
						) {
							const {children, ...rest} = item;
							return rest;
						}

						return null;
					}

					if (
						(isSenior && item.isSpecial !== TYPE_SPECIAL.CONFIRM_CONTRACTOR) ||
						(!isSenior && (item.isSpecial === TYPE_SPECIAL.NORMAL || item.isSpecial === TYPE_SPECIAL.CONFIRM_CONTRACTOR))
					) {
						return item;
					}

					return null;
				})
				.filter(Boolean) as IMenuItem[];
		};
		return filterMenu(Menu);
	}, [infoUser]);

	return (
		<div id='menuTab' className={styles.container}>
			<div className={clsx(styles.header, {[styles.header_small]: !context.showFull})}>
				<Link href={PATH.Home} className={styles.box_logo}>
					{context?.showFull ? (
						<ImageFill src={icons.logoFull} className={styles.logo_icon} alt='Logo full' />
					) : (
						<ImageFill src={icons.logoSmall} className={styles.logo_small} alt='Logo small' />
					)}
				</Link>
				<Link href={PATH.Home} className={styles.box_logo_mobile}>
					<ImageFill src={icons.logoSmall} className={styles.logo_small} alt='Logo small' />
				</Link>
			</div>

			<div className={clsx(styles.menu)}>
				{menus.map((item) => {
					const isGroup = !!item.children;
					const isGroupOpen = openGroups[item.title];
					const isGroupActive = isGroup && checkGroupActive(item.children!);

					if (isGroup) {
						return (
							<div className={styles.menuGroup} key={item.title}>
								{context?.showFull ? (
									<>
										<div
											className={clsx(styles.itemMenu, {
												[styles.active]: isGroupActive,
												[styles.small]: !context?.showFull,
											})}
											onClick={() => toggleGroup(item.title)}
										>
											<div className={styles.iconMenu}>
												<item.icon size={20} />
											</div>
											<p className={styles.textMenu}>{item.title}</p>
											{context?.showFull && (
												<span
													className={clsx(styles.arrow, {
														[styles.open]: isGroupOpen,
													})}
												>
													<ArrowRight2 size={16} />
												</span>
											)}
										</div>

										{isGroupOpen && (
											<div className={styles.groupChildren}>
												{item.children!.map((child) => (
													<Link
														href={child.path!}
														key={child.title}
														className={clsx(styles.itemMenuChild, {
															[styles.active]: checkActive(child.pathActive ?? child.path),
														})}
														onClick={() => {
															if (isMobile) context?.setShowFull?.(false);
														}}
													>
														<div className={styles.iconMenu}>
															<child.icon size={18} />
														</div>
														<p className={styles.textMenu}>{child.title}</p>
													</Link>
												))}
											</div>
										)}
									</>
								) : (
									<TippyHeadless
										trigger='click'
										interactive
										hideOnClick={true}
										placement='bottom-start'
										offset={[0, 2]}
										appendTo={typeof window !== 'undefined' ? document.body : undefined}
										onCreate={(instance) => {
											tippyRef.current = instance;
										}}
										render={(attrs) => (
											<div className={styles.groupChildrenTippy} tabIndex={-1} {...attrs}>
												<div className={styles.tippyTitle}>{item.title}</div>
												<div className={styles.tippyChildList}>
													{item.children!.map((child) => (
														<Link
															href={child.path!}
															key={child.title}
															className={clsx(styles.itemMenuChild, {
																[styles.active]: checkActive(child.pathActive ?? child.path),
															})}
															onClick={() => {
																tippyRef.current?.hide();
																if (isMobile) context?.setShowFull?.(false);
															}}
														>
															<div className={styles.iconMenu}>
																<child.icon size={18} />
															</div>
															<p className={styles.textMenu}>{child.title}</p>
														</Link>
													))}
												</div>
											</div>
										)}
									>
										<div
											className={clsx(styles.itemMenu, {
												[styles.active]: isGroupActive,
												[styles.small]: !context?.showFull,
											})}
										>
											<div className={styles.iconMenu}>
												<item.icon size={20} />
											</div>
										</div>
									</TippyHeadless>
								)}
							</div>
						);
					}

					return (
						<Link
							href={item.path!}
							key={item.title}
							className={clsx(styles.itemMenu, {
								[styles.active]: checkActive(item.pathActive ?? item.path),
								[styles.small]: !context?.showFull,
							})}
							onClick={() => {
								if (isMobile) context?.setShowFull?.(false);
							}}
						>
							<div className={styles.iconMenu}>
								<item.icon size={20} />
							</div>
							<p className={styles.textMenu}>{item.title}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default MenuTab;
