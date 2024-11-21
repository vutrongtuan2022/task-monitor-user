import React, {useState} from 'react';
import styles from './ContractItemCreate.module.scss';
import {PropsContractItemCreate} from './interfaces';
import StateActive from '~/components/common/StateActive';
import {STATE_REPORT_WORK} from '~/constants/config/enum';
import GridColumn from '~/components/layouts/GridColumn';
import Progress from '~/components/common/Progress';
import DatePicker from '~/components/common/DatePicker';
import {convertCoin} from '~/common/funcs/convertCoin';
import Moment from 'react-moment';
import {Trash} from 'iconsax-react';
import clsx from 'clsx';

function ContractItemCreate({index, contract, handleChangeValue, handleDelete}: PropsContractItemCreate) {
	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin hợp đồng</h4>
						<div className={styles.state}>
							<p>Trạng thái công việc:</p>
							<StateActive
								stateActive={contract?.activityDTO?.state}
								listState={[
									{
										state: STATE_REPORT_WORK.NOT_PROCESSED,
										text: 'Chưa xử lý',
										textColor: '#fff',
										backgroundColor: '#F37277',
									},
									{
										state: STATE_REPORT_WORK.PROCESSING,
										text: 'Đang xử lý',
										textColor: '#fff',
										backgroundColor: '#16C1F3',
									},
									{
										state: STATE_REPORT_WORK.COMPLETED,
										text: 'Đã hoàn thành',
										textColor: '#fff',
										backgroundColor: '#06D7A0',
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.main}>
						<GridColumn col_3>
							<div className={styles.item}>
								<p>Số hợp đồng</p>
								<p>{contract?.code || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Lũy kế giải ngân hiện tại</p>
								<p>
									<span style={{color: '#EE464C'}}>{convertCoin(contract?.accumAmount)}</span> /{' '}
									<span>{convertCoin(contract?.amount)}</span>
								</p>
							</div>
							<div className={styles.item}>
								<p>Tiến độ giải ngân</p>
								<Progress percent={contract?.progress} width={80} />
							</div>
							<div className={styles.item}>
								<p>Tên công việc</p>
								<p>{contract?.activityDTO?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Thuộc nhóm nhà thầu</p>
								<p>{contract?.contractorDTO?.contractorCat?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên nhà thầu</p>
								<p>{contract?.contractorDTO?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày ký hợp đồng</p>
								<p>{contract?.startDate ? <Moment date={contract?.startDate} format='DD/MM/YYYY' /> : '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Giá trị hợp đồng</p>
								<p>{convertCoin(contract?.amount) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Thời gian THHĐ</p>
								<p>{contract?.totalDayAdvantage || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Giá trị BLTHHĐ</p>
								<p>{convertCoin(contract?.contractExecution?.amount) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày kết thúc BLTHHĐ</p>
								<p>
									{contract?.contractExecution?.endDate ? (
										<Moment date={contract?.contractExecution?.endDate} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Giá trị BLTƯ</p>
								<p>{convertCoin(contract?.advanceGuarantee?.amount) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày kết thúc BLTƯ</p>
								<p>
									{contract?.advanceGuarantee?.endDate ? (
										<Moment date={contract?.advanceGuarantee?.endDate} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
						</GridColumn>
					</div>
				</div>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin giải ngân</h4>

						<div className={styles.delete} onClick={handleDelete}>
							<Trash size={22} color='#EE464C' />
						</div>
					</div>
					<div className={styles.main}>
						<p className={styles.label}>Vốn dự phòng</p>
						<div className={styles.input_specification}>
							<input
								name='value'
								type='text'
								placeholder='Nhập vốn dự phòng'
								className={styles.input}
								value={contract?.reverseAmount}
								onChange={(e) => handleChangeValue(index, 'reverseAmount', e.target.value, true)}
							/>
							<div className={styles.unit}>VNĐ</div>
						</div>
						<p className={clsx(styles.label, styles.mt)}>Vốn dự án</p>
						<div className={styles.input_specification}>
							<input
								name='value'
								type='text'
								placeholder='Nhập vốn dự án'
								className={styles.input}
								value={contract?.amountDisbursement}
								onChange={(e) => handleChangeValue(index, 'amountDisbursement', e.target.value, true)}
							/>
							<div className={styles.unit}>VNĐ</div>
						</div>
						<div className={styles.mt}>
							<DatePicker
								onClean={true}
								icon={true}
								label={<span>Ngày giải ngân</span>}
								placeholder='Chọn ngày giải ngân'
								value={contract?.dayDisbursement}
								onSetValue={(date) => handleChangeValue(index, 'dayDisbursement', date)}
								name='birthday'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContractItemCreate;
