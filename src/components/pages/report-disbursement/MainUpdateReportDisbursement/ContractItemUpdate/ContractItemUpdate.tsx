import React from 'react';
import styles from './ContractItemUpdate.module.scss';
import {PropsContractItemUpdate} from './interfaces';
import StateActive from '~/components/common/StateActive';
import {STATE_REPORT_WORK} from '~/constants/config/enum';
import GridColumn from '~/components/layouts/GridColumn';
import Progress from '~/components/common/Progress';
import DatePicker from '~/components/common/DatePicker';
import {convertCoin} from '~/common/funcs/convertCoin';
import Moment from 'react-moment';

function ContractItemUpdate({index, contract, handleChangeValue}: PropsContractItemUpdate) {
	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				<div className={styles.basic_info}>
					<div className={styles.head}>
						<h4>Thông tin hợp đồng</h4>
						<div className={styles.state}>
							<p>Trạng thái công việc:</p>
							<StateActive
								stateActive={contract?.detailContractsDTO?.activityDTO?.state}
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
								<p>{contract?.detailContractsDTO?.code || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Lũy kế giải ngân hiện tại</p>
								<p>
									<span style={{color: '#EE464C'}}>{convertCoin(contract?.detailContractsDTO?.accumAmount)}</span> /{' '}
									<span>{convertCoin(contract?.detailContractsDTO?.amount)}</span>
								</p>
							</div>
							<div className={styles.item}>
								<p>Tiến độ giải ngân</p>
								<Progress percent={contract?.detailContractsDTO?.progress} width={80} />
							</div>
							<div className={styles.item}>
								<p>Tên công việc</p>
								<p>{contract?.detailContractsDTO?.activityDTO?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Thuộc nhóm nhà thầu</p>
								<p>{contract?.detailContractsDTO?.contractorDTO?.contractorCat?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Tên nhà thầu</p>
								<p>{contract?.detailContractsDTO?.contractorDTO?.name || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày ký hợp đồng</p>
								<p>
									{contract?.detailContractsDTO?.startDate ? (
										<Moment date={contract?.detailContractsDTO?.startDate} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Giá trị hợp đồng</p>
								<p>{convertCoin(contract?.detailContractsDTO?.amount) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Thời gian THHĐ</p>
								<p>
									{contract?.detailContractsDTO?.totalDayAdvantage ? (
										<Moment date={contract?.detailContractsDTO?.totalDayAdvantage} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Giá trị BLTHHĐ</p>
								<p>{convertCoin(contract?.detailContractsDTO?.contractExecution?.amount) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày kết thúc BLTHHĐ</p>
								<p>
									{contract?.detailContractsDTO?.contractExecution?.endDate ? (
										<Moment date={contract?.detailContractsDTO?.contractExecution?.endDate} format='DD/MM/YYYY' />
									) : (
										'---'
									)}
								</p>
							</div>
							<div className={styles.item}>
								<p>Giá trị BLTƯ</p>
								<p>{convertCoin(contract?.detailContractsDTO?.advanceGuarantee?.amount) || '---'}</p>
							</div>
							<div className={styles.item}>
								<p>Ngày kết thúc BLTƯ</p>
								<p>
									{contract?.detailContractsDTO?.advanceGuarantee?.endDate ? (
										<Moment date={contract?.detailContractsDTO?.advanceGuarantee?.endDate} format='DD/MM/YYYY' />
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
					</div>
					<div className={styles.main}>
						<p className={styles.label}>
							Số tiền giải ngân <span style={{color: 'red'}}>*</span>
						</p>
						<div className={styles.input_specification}>
							<input
								name='value'
								type='text'
								placeholder='Nhập số tiền giải ngân'
								className={styles.input}
								value={contract?.guaranteeAmount}
								onChange={(e) => handleChangeValue(index, 'guaranteeAmount', e.target.value, true)}
							/>
							<div className={styles.unit}>VNĐ</div>
						</div>
						<div className={styles.mt}>
							<DatePicker
								onClean={true}
								icon={true}
								label={
									<span>
										Ngày giải ngân <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Chọn ngày giải ngân'
								value={contract?.releaseDate}
								onSetValue={(date) => handleChangeValue(index, 'releaseDate', date)}
								name='birthday'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContractItemUpdate;
