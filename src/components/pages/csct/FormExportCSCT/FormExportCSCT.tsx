import Button from '~/components/common/Button';
import styles from './FormExportCSCT.module.scss';
import {IPNForExport, PropsFormExportCSCT} from './interfaces';
import {IoClose} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import pnServices from '~/services/pnServices';
import {useState} from 'react';
import Form, {Input} from '~/components/common/Form';
import {generateCSCTDocx} from '~/word-template/TemplateCSCTTT';
import {Packer} from 'docx';
import saveAs from 'file-saver';

export enum TYPE_PN_EXPORT {
	THANH_TOAN,
	TAM_UNG,
	THANH_TOAN_TAM_UNG,
}

function FormExportCSCT({onClose}: PropsFormExportCSCT) {
	const router = useRouter();

	const {_uuidExportCSCT} = router.query;

	const [form, setForm] = useState<{code: string; type: TYPE_PN_EXPORT}>({
		code: '',
		type: TYPE_PN_EXPORT.THANH_TOAN,
	});

	const {data: pnExport} = useQuery<IPNForExport>([QUERY_KEY.detail_pn_for_export, _uuidExportCSCT], {
		queryFn: () =>
			httpRequest({
				http: pnServices.PNForExport({
					uuid: _uuidExportCSCT as string,
				}),
			}),
		onSuccess(data) {
			setForm((prev) => ({
				...prev,
				code: data?.code || '',
			}));
		},
		select(data) {
			return data;
		},
		enabled: !!_uuidExportCSCT,
	});

	const handleSubmit = () => {
		if (!!pnExport) {
			const doc = generateCSCTDocx({type: form.type, pn: pnExport});

			Packer.toBlob(doc).then((blob) => {
				saveAs(blob, 'Thong_bao_chap_thuan_thanh_toan.docx');
			});
		}
	};

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Xuất file</h4>

			<div className={styles.form}>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<Input
						placeholder='Nhập mã cấp số'
						name='code'
						readOnly={true}
						label={
							<span>
								Mã cấp số <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<div className={styles.gennder}>
						<label style={{fontSize: '16px', fontWeight: '500'}}>
							Dữ liệu xuất <span style={{color: 'red'}}>*</span>
						</label>
						<div className={styles.group_radio}>
							<div className={styles.item_radio}>
								<input
									id='thanh_toan'
									className={styles.input_radio}
									type='radio'
									name='type'
									value={form.type}
									checked={form.type == TYPE_PN_EXPORT.THANH_TOAN}
									onChange={() =>
										setForm((prev: any) => ({
											...prev,
											type: TYPE_PN_EXPORT.THANH_TOAN,
										}))
									}
								/>
								<label className={styles.input_lable} htmlFor='thanh_toan'>
									Thanh toán
								</label>
							</div>

							<div className={styles.item_radio}>
								<input
									id='tam_ung'
									className={styles.input_radio}
									type='radio'
									name='type'
									value={form.type}
									checked={form.type == TYPE_PN_EXPORT.TAM_UNG}
									onChange={(e) =>
										setForm((prev: any) => ({
											...prev,
											type: TYPE_PN_EXPORT.TAM_UNG,
										}))
									}
								/>
								<label className={styles.input_lable} htmlFor='tam_ung'>
									Tạm ứng
								</label>
							</div>

							<div className={styles.item_radio}>
								<input
									id='thanh_toan_tam_ung'
									className={styles.input_radio}
									type='radio'
									name='type'
									value={form.type}
									checked={form.type == TYPE_PN_EXPORT.THANH_TOAN_TAM_UNG}
									onChange={(e) =>
										setForm((prev: any) => ({
											...prev,
											type: TYPE_PN_EXPORT.THANH_TOAN_TAM_UNG,
										}))
									}
								/>
								<label className={styles.input_lable} htmlFor='thanh_toan_tam_ung'>
									Thanh toán & Tạm ứng
								</label>
							</div>
						</div>
					</div>

					<div className={styles.groupBtnPopup}>
						<div>
							<Button p_12_20 rounded_8 white_outline onClick={onClose} maxContent>
								Hủy bỏ
							</Button>
						</div>
						<div>
							<Button bold rounded_8 p_12_20>
								Lưu lại
							</Button>
						</div>
					</div>
				</Form>

				<div className={styles.close} onClick={onClose}>
					<IoClose />
				</div>
			</div>
		</div>
	);
}

export default FormExportCSCT;
