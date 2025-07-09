import React, {forwardRef} from 'react';
import {PropsTemplateCSCTTT} from './interfaces';
import styles from './TemplateCSCTTT.module.scss';
import DocumentHeader from '../DocumentHeader';

const TemplateCSCTTT = forwardRef<HTMLDivElement, PropsTemplateCSCTTT>(({csct}, ref) => {
	return (
		<div ref={ref} className={styles.container}>
			<DocumentHeader />
		</div>
	);
});

TemplateCSCTTT.displayName = 'TemplateCSCTTT';

export default TemplateCSCTTT;
