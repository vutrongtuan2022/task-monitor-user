import {Fragment} from 'react';
import Loading from './components/Loading';
import Noti from './components/Noti';
import {PropsDataWrapper} from './interfaces';
import styles from './DataWrapper.module.scss';
import clsx from 'clsx';

function DataWrapper({loading, data = [], children, noti = <Noti />, showScroll = false}: PropsDataWrapper) {
	return (
		<Fragment>
			{loading ? (
				<div className={styles.container}>
					<div className={styles.loading}>
						<Loading />
					</div>
				</div>
			) : null}

			{!loading && data?.length <= 0 ? (
				<div className={styles.container}>
					<div className={styles.loading}>{noti}</div>
				</div>
			) : null}

			{!loading && data?.length > 0 ? <div className={clsx(styles.main, {[styles.showScroll]: showScroll})}>{children}</div> : null}
		</Fragment>
	);
}

export default DataWrapper;
