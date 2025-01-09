import {RootState} from '~/redux/store';
import {useCallback, useContext, useMemo} from 'react';

import {ContextBaseLayout} from '../../BaseLayout';
import {PropsMenuTab} from './interfaces';
import {TContextBaseLayout} from '../../interfaces';
import styles from './MenuTab.module.scss';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import Link from 'next/link';
import {Menu, PATH} from '~/constants/config';
import ImageFill from '~/components/common/ImageFill';
import icons from '~/constants/images/icons';
import clsx from 'clsx';
import {TYPE_SPECIAL} from '~/constants/config/enum';

function MenuTab({}: PropsMenuTab) {
	const router = useRouter();

	const {isMobile} = useSelector((state: RootState) => state.site);
	const {infoUser} = useSelector((state: RootState) => state.user);

	const context = useContext<TContextBaseLayout>(ContextBaseLayout);

	const checkActive = useCallback(
		(pathname: string) => {
			const currentRoute = router.pathname.split('/')[1];

			return pathname == `/${currentRoute}`;
		},
		[router]
	);

	const menus = useMemo(() => {
		if (infoUser?.special == TYPE_SPECIAL.SENIOR) {
			return Menu;
		} else {
			return Menu?.filter((v) => v?.isSpecial == TYPE_SPECIAL.NORMAL);
		}
	}, [infoUser]);

	return (
		<div id='menuTab' className={styles.container}>
			<div
				className={clsx(styles.header, {
					[styles.header_small]: !context.showFull,
				})}
			>
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
				{menus.map((v, i) => (
					<Link
						href={v.path}
						key={i}
						className={clsx(styles.itemMenu, {
							[styles.active]: checkActive(v.path) || checkActive(v?.pathActive!),
							[styles.small]: !context?.showFull,
						})}
						onClick={() => {
							isMobile && context?.setShowFull!(!context?.showFull);
						}}
					>
						<div className={styles.iconMenu}>
							<v.icon size={20} />
						</div>
						<p className={styles.textMenu}>{v.title}</p>
					</Link>
				))}
			</div>
		</div>
	);
}

export default MenuTab;
