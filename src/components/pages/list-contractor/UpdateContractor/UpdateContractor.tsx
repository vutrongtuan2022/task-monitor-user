import React, {useState} from 'react';

import {IDetailContractor, IFormUpdateContractor, PropsUpdateContractor} from './interfaces';
import styles from './UpdateContractor.module.scss';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import {FolderOpen} from 'iconsax-react';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import {useRouter} from 'next/router';
import contractorServices from '~/services/contractorServices';
import Select, {Option} from '~/components/common/Select';
import provineServices from '~/services/provineServices';
import contractorcatServices from '~/services/contractorcatServices';
import {toastWarn} from '~/common/funcs/toast';
import SelectMany from '~/components/common/SelectMany';

function UpdateContractor({onClose}: PropsUpdateContractor) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidContractor} = router.query;
	const [contractorCat, setContractorCat] = useState<any[]>([]);
	const [contractorCatDisable, setContractorCatDisable] = useState<any[]>([]);
	const [form, setForm] = useState<IFormUpdateContractor>({
		name: '',
		note: '',
		matp: '',
		maqh: '',
		xaid: '',
		address: '',
		code: '',
	});

	useQuery<IDetailContractor>([QUERY_KEY.detail_contractor, _uuidContractor], {
		queryFn: () =>
			httpRequest({
				http: contractorServices.detailContractor({
					uuid: _uuidContractor as string,
				}),
			}),
		onSuccess(data) {
			setForm({
				name: data?.name || '',
				note: data?.note || '',
				matp: data?.tp?.uuid || '',
				maqh: data?.qh?.uuid || '',
				xaid: data?.xa?.uuid || '',
				address: data?.address || '',
				code: data?.code || '',
			});
			setContractorCat(
				data?.contractorCat?.map((v) => ({
					uuid: v?.uuid,
					title: v?.name,
					code: v?.code,
				}))
			);
			setContractorCatDisable(
				data?.contractorCat?.map((v) => ({
					uuid: v?.uuid,
					title: v?.name,
					code: v?.code,
				}))
			);
		},
		enabled: !!_uuidContractor,
	});

	const {data: listGroupContractor} = useQuery([QUERY_KEY.dropdown_group_contractor], {
		queryFn: () =>
			httpRequest({
				http: contractorcatServices.categoryContractorCat({
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					uuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listProvince = useQuery([QUERY_KEY.dropdown_province], {
		queryFn: () =>
			httpRequest({
				http: provineServices.listProvine({
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listDistrict = useQuery([QUERY_KEY.dropdown_district, form.matp], {
		queryFn: () =>
			httpRequest({
				http: provineServices.listDistrict({
					keyword: '',
					idParent: form.matp,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.matp,
	});

	const listTown = useQuery([QUERY_KEY.dropdown_town, form.maqh], {
		queryFn: () =>
			httpRequest({
				http: provineServices.listTown({
					keyword: '',
					idParent: form.maqh,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.maqh,
	});

	const funcSendUpdateContractorCat = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				http: contractorServices.sendUpdateContractorCat({
					uuid: _uuidContractor as string,
					contractorCatuuid: contractorCat
						?.filter((v) => !contractorCatDisable?.some((x: any) => x?.uuid == v?.uuid))
						?.map((v) => v?.uuid),
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					name: '',
					note: '',
					matp: '',
					maqh: '',
					xaid: '',
					address: '',
					code: '',
				});
				queryClient.invalidateQueries([QUERY_KEY.table_list_contractor]);
			}
		},
	});

	const handleSubmit = () => {
		if (contractorCat?.length == 0) {
			return toastWarn({msg: 'Vui lòng chọn nhóm nhà thầu!'});
		}

		return funcSendUpdateContractorCat.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
			<Loading loading={funcSendUpdateContractorCat.isLoading} />
			<div className={styles.container}>
				<h4 className={styles.title}>Bổ sung nhóm nhà thầu</h4>
				<div className={styles.form}>
					<Input
						placeholder='Nhập tên nhà thầu'
						name='name'
						type='text'
						value={form.name}
						isRequired
						max={255}
						label={
							<span>
								Tên nhà thầu <span style={{color: 'red'}}>*</span>
							</span>
						}
						readOnly={true}
					/>
					<Input
						placeholder='Nhập mã số thuế'
						name='code'
						type='text'
						value={form.code}
						max={15}
						label={
							<span>
								Mã số thuế <span style={{color: 'red'}}>*</span>
							</span>
						}
						readOnly={true}
					/>
					<div className={styles.mt}>
						<SelectMany
							placeholder='Chọn'
							label={
								<span>
									Thuộc nhóm nhà thầu <span style={{color: 'red'}}>*</span>
								</span>
							}
							value={contractorCat}
							setValue={(contractorcat) =>
								setContractorCat(
									contractorCat?.find((v: any) => v?.uuid == contractorcat.uuid)
										? contractorCat?.filter((v: any) => v?.uuid != contractorcat.uuid)
										: [...contractorCat, contractorcat]
								)
							}
							listData={listGroupContractor?.map((v: any) => ({
								uuid: v?.uuid,
								title: v?.name,
								code: v?.code,
							}))}
							listDataDisable={contractorCatDisable}
						/>
					</div>
					<div className={styles.mt}>
						<Select isSearch name='matp' value={form.matp} placeholder='Lựa chọn' label={<span>Tỉnh/ TP</span>} readOnly={true}>
							{listProvince?.data?.map((v: any) => (
								<Option
									key={v?.matp}
									value={v?.matp}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											matp: v?.matp,
											maqh: '',
											xaid: '',
										}))
									}
								/>
							))}
						</Select>
						<Select
							isSearch
							name='maqh'
							value={form.maqh}
							placeholder='Lựa chọn'
							label={<span>Quận/ Huyện</span>}
							readOnly={true}
						>
							{listDistrict?.data?.map((v: any) => (
								<Option
									key={v?.maqh}
									value={v?.maqh}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											maqh: v?.maqh,
											xaid: '',
										}))
									}
								/>
							))}
						</Select>
						<Select
							isSearch
							name='xaid'
							value={form.xaid}
							placeholder='Lựa chọn'
							label={<span>Thị trấn/ Xã </span>}
							readOnly={true}
						>
							{listTown?.data?.map((v: any) => (
								<Option
									key={v?.xaid}
									value={v?.xaid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											xaid: v?.xaid,
										}))
									}
								/>
							))}
						</Select>
					</div>
					<div className={styles.mt}>
						<Input
							placeholder='Nhập địa chỉ'
							name='address'
							type='text'
							value={form.address}
							max={255}
							label={<span>Địa chỉ chi tiết</span>}
							readOnly={true}
						/>
					</div>
					<div className={styles.mt}>
						<TextArea name='note' placeholder='Nhập mô tả' label='Mô tả' max={5000} blur readOnly={true} />
					</div>
				</div>
				<div className={styles.group_button}>
					<div>
						<Button p_12_20 grey rounded_6 onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>
					<FormContext.Consumer>
						{({isDone}) => (
							<div className={styles.btn}>
								<Button disable={!isDone} p_12_20 primary rounded_6 icon={<FolderOpen size={18} color='#fff' />}>
									Gửi yêu cầu
								</Button>
							</div>
						)}
					</FormContext.Consumer>
				</div>
				<div className={styles.close} onClick={onClose}>
					<IoClose size={28} color='#8492A6' />
				</div>
			</div>
		</Form>
	);
}

export default UpdateContractor;
