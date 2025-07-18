import {Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, VerticalAlign} from 'docx';
import moment from 'moment';
import {convertCoin, numberToWords} from '~/common/funcs/convertCoin';
import {TYPE_PN_EXPORT} from '~/components/pages/csct/FormExportCSCT/FormExportCSCT';
import {IPNForExport} from '~/components/pages/csct/FormExportCSCT/interfaces';
import {TYPE_CONTRACT_PN} from '~/constants/config/enum';

const toRomanLowerCase = (num: number): string => {
	const romans = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
	return romans[num - 1] || num.toString();
};

export const generateCSCTDocx = ({type, pn}: {type: TYPE_PN_EXPORT; pn: IPNForExport}) => {
	const today = new Date();

	// Danh sách Căn cứ Hợp đồng
	const contractParagraphs = pn?.contracts.map(
		(contract) =>
			new Paragraph({
				alignment: AlignmentType.JUSTIFIED,
				indent: {firstLine: 600},
				spacing: {before: 100},
				children: [
					new TextRun({
						text: `Căn cứ Hợp đồng số ${contract?.code} ngày ${moment(contract?.startDate).format(
							'DD/MM/YYYY'
						)} giữa Ngân hàng TMCP Công thương Việt Nam – ${pn?.project?.branch?.name} và ${contract?.contractorLinks
							?.map((contractor) => `${contractor?.contractor?.name} V/v ${contractor.contractorCat?.name}`)
							?.join(' - ')} công trình ${pn?.project?.name} – ${pn?.project?.branch?.name};`,
					}),
				],
			})
	);

	// Danh sách tên hợp đồng
	const contractNameParagraphs = pn?.contracts?.map(
		(contract, index) =>
			new Paragraph({
				alignment: AlignmentType.JUSTIFIED,
				spacing: {before: 100},
				indent: {firstLine: 720},
				children: [
					new TextRun({
						text: `${toRomanLowerCase(index + 1)}. Hợp đồng số ${contract?.code} ngày ${moment(contract?.startDate).format(
							'DD/MM/YYYY'
						)} giữa Ngân hàng TMCP Công thương Việt Nam – ${pn?.project?.branch?.name} và ${contract?.contractorLinks
							?.map((contractor) => `${contractor?.contractor?.name} V/v ${contractor.contractorCat?.name} `)
							?.join(' - ')}.`,
					}),
				],
			})
	);

	// Danh sách hợp đồng, tiền hợp đồng, nội dung thanh toán
	const pnContractsParagraphs = pn?.pnContracts?.flatMap((pnContract, index) => [
		new Paragraph({
			alignment: AlignmentType.JUSTIFIED,
			spacing: {before: 100},
			indent: {firstLine: 720},
			children: [
				new TextRun({
					text: `${toRomanLowerCase(index + 1)}. Hợp đồng số ${pnContract?.contract?.code} ngày ${moment(
						pnContract?.contract?.startDate
					).format('DD/MM/YYYY')} V/v ${pnContract.contractor?.contractorCat?.name}.`,
				}),
			],
		}),
		new Paragraph({
			alignment: AlignmentType.JUSTIFIED,
			spacing: {before: 100},
			indent: {firstLine: 720},
			children: [
				new TextRun({
					text: `- Số tiền tạm ứng/thanh toán: ${
						pnContract?.type == TYPE_CONTRACT_PN.PAY
							? convertCoin(pnContract?.remainingAmount)
							: convertCoin(pnContract?.advanceAmount)
					}`,
				}),
			],
		}),
		new Paragraph({
			alignment: AlignmentType.CENTER,
			spacing: {before: 100},
			children: [
				new TextRun({
					text: `(Bằng chữ: ${
						pnContract?.type == TYPE_CONTRACT_PN.PAY
							? numberToWords(pnContract?.remainingAmount)
							: numberToWords(pnContract?.advanceAmount)
					} )`,
					italics: true,
				}),
			],
		}),
		new Paragraph({
			alignment: AlignmentType.JUSTIFIED,
			spacing: {before: 100},
			indent: {firstLine: 720},
			children: [
				new TextRun({
					text: `- Nội dung tạm ứng/thanh toán: ${pnContract?.note || '...'}`,
				}),
			],
		}),
	]);

	// Hiển thị bảng tiền Thanh toán hoặc Tạm ứng theo type
	const getTablesByType = (): Table[] => {
		// Bảng tạm ứng
		const TAM_UNG = new Table({
			width: {
				size: 100,
				type: WidthType.PERCENTAGE,
			},
			borders: {
				top: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				bottom: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				left: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				right: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				insideHorizontal: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				insideVertical: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
			},
			rows: [
				new TableRow({
					children: [
						new TableCell({
							width: {size: 8, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun('Nợ')],
								}),
							],
						}),
						new TableCell({
							width: {size: 27, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun(`126150640 (${pn?.project?.branch?.code})`)],
								}),
							],
						}),
						new TableCell({
							width: {size: 43, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun('Tạm ứng chi phí công trình')],
								}),
							],
						}),
						new TableCell({
							width: {size: 22, type: WidthType.PERCENTAGE},
							rowSpan: 2,
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun(`${convertCoin(pn?.totalAdvanceAmount)}`)],
								}),
							],
						}),
					],
				}),
				new TableRow({
					children: [
						new TableCell({
							width: {size: 8, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun('Có')],
								}),
							],
						}),
						new TableCell({
							width: {size: 27, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun(`224420600 (${pn?.project?.branch?.code})`)],
								}),
							],
						}),
						new TableCell({
							width: {size: 43, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun('Tài khoản trung gian giữa OGL và core')],
								}),
							],
						}),
					],
				}),
			],
		});

		// Bảng thanh toán
		const THANH_TOAN = new Table({
			width: {
				size: 100,
				type: WidthType.PERCENTAGE,
			},
			borders: {
				top: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				bottom: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				left: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				right: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				insideHorizontal: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
				insideVertical: {style: BorderStyle.SINGLE, size: 1, color: '000000'},
			},
			rows: [
				new TableRow({
					children: [
						new TableCell({
							width: {size: 8, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun('Nợ')],
								}),
							],
						}),
						new TableCell({
							width: {size: 27, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun(`131210000 (${pn?.project?.branch?.code})`)],
								}),
							],
						}),
						new TableCell({
							width: {size: 43, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.LEFT,
									children: [new TextRun('Chi phí công trình bằng vốn đầu tư, mua sắm TSCĐ')],
								}),
							],
						}),
						new TableCell({
							width: {size: 22, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun(`${convertCoin(pn?.totalPaymenAmount)}`)],
								}),
							],
						}),
					],
				}),
				new TableRow({
					children: [
						new TableCell({
							width: {size: 8, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun('Có')],
								}),
							],
						}),
						new TableCell({
							width: {size: 27, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun(`126150640 (${pn?.project?.branch?.code})`)],
								}),
							],
						}),
						new TableCell({
							width: {size: 43, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.LEFT,
									children: [new TextRun('Tạm ứng chi phí công trình ')],
								}),
							],
						}),
						new TableCell({
							width: {size: 22, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun(`${convertCoin(pn?.totalReverseAmount)}`)],
								}),
							],
						}),
					],
				}),
				new TableRow({
					children: [
						new TableCell({
							width: {size: 8, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun('Có')],
								}),
							],
						}),
						new TableCell({
							width: {size: 27, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun(`224420600 (${pn?.project?.branch?.code})`)],
								}),
							],
						}),
						new TableCell({
							width: {size: 43, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.LEFT,
									children: [new TextRun('Tài khoản trung gian giữa OGL và core')],
								}),
							],
						}),
						new TableCell({
							width: {size: 22, type: WidthType.PERCENTAGE},
							verticalAlign: VerticalAlign.CENTER,
							children: [
								new Paragraph({
									alignment: AlignmentType.CENTER,
									children: [new TextRun(`${convertCoin(pn?.totalRemainingAmountOut)}`)],
								}),
							],
						}),
					],
				}),
			],
		});

		const TEXT_TAM_UNG = new Paragraph({
			alignment: AlignmentType.JUSTIFIED,
			spacing: {before: 100, after: 100},
			indent: {firstLine: 720},
			children: [
				new TextRun({
					text: 'a. Với trường hợp tạm ứng:',
				}),
			],
		});

		const TEXT_THANH_TOAN = new Paragraph({
			alignment: AlignmentType.JUSTIFIED,
			spacing: {before: 100, after: 100},
			indent: {firstLine: 720},
			children: [
				new TextRun({
					text: 'b. Với trường hợp thanh toán:',
				}),
			],
		});

		if (type == TYPE_PN_EXPORT.TAM_UNG) return [TAM_UNG];
		if (type == TYPE_PN_EXPORT.THANH_TOAN) return [THANH_TOAN];
		if (type == TYPE_PN_EXPORT.THANH_TOAN_TAM_UNG) return [TEXT_TAM_UNG, TAM_UNG, TEXT_THANH_TOAN, THANH_TOAN];

		return [];
	};

	return new Document({
		styles: {
			default: {
				document: {
					run: {
						font: 'Times New Roman',
						size: 26,
					},
				},
			},
		},
		sections: [
			{
				properties: {},
				children: [
					new Table({
						width: {size: 108, type: WidthType.PERCENTAGE},
						borders: {
							top: {style: 'none', size: 0, color: 'FFFFFF'},
							bottom: {style: 'none', size: 0, color: 'FFFFFF'},
							left: {style: 'none', size: 0, color: 'FFFFFF'},
							right: {style: 'none', size: 0, color: 'FFFFFF'},
							insideHorizontal: {style: 'none', size: 0, color: 'FFFFFF'},
							insideVertical: {style: 'none', size: 0, color: 'FFFFFF'},
						},
						rows: [
							new TableRow({
								children: [
									new TableCell({
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'NGÂN HÀNG TMCP CÔNG THƯƠNG', size: 24, bold: true})],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'VIỆT NAM', size: 24, bold: true, underline: {}})],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												spacing: {before: 160},
												children: [
													new TextRun({text: 'Số: ', size: 24}),
													new TextRun({
														text: `${pn?.codeDOC}./TV-XDCB-${pn?.codeDOCNumber}`,
														size: 24,
														italics: true,
													}),
												],
											}),
										],
									}),
									new TableCell({
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM',
														size: 24,
														bold: true,
													}),
												],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'Độc lập - Tự do - Hạnh phúc',
														size: 24,
														bold: true,
														underline: {},
													}),
												],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												spacing: {before: 160},
												children: [
													new TextRun({text: 'Hà Nội, ngày ', size: 24, italics: true}),
													new TextRun({text: moment(today).format('DD'), size: 24, italics: true}),
													new TextRun({text: ' tháng ', italics: true}),
													new TextRun({text: moment(today).format('MM'), size: 24, italics: true}),
													new TextRun({text: ' năm ', italics: true}),
													new TextRun({text: moment(today).format('YYYY'), size: 24, italics: true}),
												],
											}),
										],
									}),
								],
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {
							before: 300,
							after: 50,
						},
						children: [
							new TextRun({
								text: 'THÔNG BÁO',
								bold: true,
								size: 28,
							}),
						],
					}),

					// Lọc những nhóm nhà thầu trùng nhau.
					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {},
						children: [
							new TextRun({
								text: `V/v Chấp thuận tạm ứng/thanh toán hợp đồng ${[
									pn?.pnContracts
										?.filter(
											(p, index, self) =>
												p?.contractor?.contractorCat?.uuid &&
												self.findIndex(
													(s) => s?.contractor?.contractorCat?.uuid === p?.contractor?.contractorCat?.uuid
												) === index
										)
										?.map((p) => p?.contractor?.contractorCat?.name),
								]?.join(', ')}`,
								bold: true,
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {after: 200},
						children: [
							new TextRun({
								text: `công trình ${pn?.project?.name} – ${pn?.project?.branch?.name}`,
								bold: true,
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {after: 100},
						children: [
							new TextRun({
								text: `Kính gửi: ${pn?.project?.branch?.name}`,
								bold: true,
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Quy định về quản lý dự án đầu tư xây dựng công trình ban hành kèm theo Quyết định số 108/CS-HĐQT-NHCT-MSTS2 ngày 21/03/2023 của Hội đồng quản trị Ngân hàng TMCP Công thương Việt Nam;',
							}),
						],
					}),

					...contractParagraphs,

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 600},
						spacing: {before: 100},
						children: [
							new TextRun({
								text: `Sau khi xem xét Tờ trình số ..../TTr-CNB ngày .../.../2025 của ${pn?.project?.branch?.name} và các hồ sơ khác kèm theo, Tờ trình đề nghị chấp thuận tạm ứng/thanh toán của Phòng QLĐTXDCB và Phòng KTTC, Chủ đầu tư chấp thuận để Chi nhánh tạm ứng/thanh toán cho nhà thầu như sau:`,
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 100},
						indent: {firstLine: 720},
						children: [
							new TextRun({
								text: `1. Tên công trình, dự án: ${pn?.project?.name}, ${pn?.project?.branch?.name}`,
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 100},
						indent: {firstLine: 720},
						children: [
							new TextRun({
								text: '2. Hợp đồng:',
							}),
						],
					}),

					...contractNameParagraphs,

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 100},
						indent: {firstLine: 720},
						children: [
							new TextRun({
								text: '3. Giá trị chấp thuận tạm ứng/thanh toán:',
							}),
						],
					}),

					...pnContractsParagraphs,

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 200},
						indent: {firstLine: 720},
						children: [
							new TextRun({
								text: `4. Tổng giá trị chấp thuận tạm ứng/thanh toán: ${pn?.totalRemainingAmount}`,
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {before: 100},
						children: [
							new TextRun({
								text: `(Bằng chữ: ${numberToWords(pn?.totalRemainingAmount)} )`,
								italics: true,
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 200},
						indent: {firstLine: 720},
						children: [
							new TextRun({
								text: '5. Nguồn vốn: Vốn đầu tư, mua sắm TSCĐ của VietinBank.',
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 100, after: 100},
						indent: {firstLine: 720},
						children: [
							new TextRun({
								text: '6. Bút toán hạch toán chính:',
							}),
						],
					}),

					...getTablesByType(),

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						spacing: {before: 100, after: 200},
						indent: {firstLine: 720},
						children: [
							new TextRun({
								text: 'Trân trọng./.',
							}),
						],
					}),

					new Table({
						width: {
							size: 100,
							type: WidthType.PERCENTAGE,
						},
						borders: {
							top: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							bottom: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							left: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							right: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							insideHorizontal: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
							insideVertical: {style: BorderStyle.NONE, size: 0, color: 'FFFFFF'},
						},
						rows: [
							new TableRow({
								children: [
									// Cột bên trái
									new TableCell({
										width: {size: 50, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.TOP,
										children: [
											new Paragraph({
												children: [new TextRun({text: 'Nơi nhận:', bold: true, italics: true})],
											}),
											new Paragraph({children: [new TextRun('- Như đề gửi;')]}),
											new Paragraph({children: [new TextRun('- TC4;')]}),
											new Paragraph({children: [new TextRun('- Lưu VP, MSTS2(1).')]}),
										],
									}),
									// Cột bên phải
									new TableCell({
										width: {size: 50, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.TOP,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'CHỦ ĐẦU TƯ', bold: true})],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'GIÁM ĐỐC KHỐI MS&QLTS', bold: true})],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: '(Đã ký)'})],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'Nguyễn Thành Xuân', bold: true})],
											}),
										],
									}),
								],
							}),
						],
					}),
				],
			},
		],
	});
};
