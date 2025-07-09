import styles from './DocumentHeader.module.scss';
import {PropsDocumentHeader} from './interfaces';
import {memo} from 'react';

function DocumentHeader({}: PropsDocumentHeader) {
	return (
		<div className={styles.documentHeader}>
			<div className={styles.info}>
				<p className={styles.title}>NGÂN HÀNG TMCP CÔNG THƯƠNG</p>
				<p className={styles.title}>VIỆT NAM</p>
				{/* <p>
					Số: <span className={styles.highlight}>{code}</span>
				</p> */}
			</div>
			{/* <div className={styles.right}>
				<p className={styles.country}>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
				<p className={styles.motto}>Độc lập - Tự do - Hạnh phúc</p>
				<div className={styles.underline} />
				<p className={styles.date}>
					{location}, ngày <span className={styles.highlight}>{momentDate.format('DD')}</span> tháng
					<span className={styles.highlight}>{momentDate.format('M')}</span> năm{' '}
					<span className={styles.highlight}>{momentDate.format('YYYY')}</span>
				</p>
			</div> */}
		</div>
	);
}

export default memo(DocumentHeader);
