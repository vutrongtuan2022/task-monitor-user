import {Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, VerticalAlign} from 'docx';
import moment from 'moment';

export const PheDuyetQuyetToanDa = (): Document => {
	const today = new Date();

	return new Document({
		styles: {
			default: {document: {run: {font: 'Times New Roman', size: 26}}},
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
														text: `---`,
														size: 24,
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
								text: 'QUYẾT ĐỊNH',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						// spacing: {before: 100},
						children: [
							new TextRun({
								text: `Về việc phê duyệt quyết toán dự án (dự án thành phần, tiểu dự án độc lập, công trình, hạng mục công trình) hoàn thành`,
								bold: true,
								size: 24,
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
								text: 'THẨM QUYỀN BAN HÀNH ',
								bold: true,
								size: 28,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Luật Đấu thầu số 43/2013/QH13 ngày 26/11/2013 của Quốc hội nước Cộng hòa xã hội chủ nghĩa Việt Nam;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Luật Xây dựng số 50/2014/QH13 ngày 18/6/2014, Luật số 62/2020/QH14 ngày 17/6/2020 của Quốc hội nước Cộng hòa xã hội chủ nghĩa Việt Nam sửa đổi một số điều của Luật Xây dựng;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Quy định về Quản lý hoạt động đầu tư xây dựng công trình ban hành kèm theo Quyết định số 108/CS-HĐQT-NHCT-MSTS2 ngày 21/03/2023 của HĐQT VietinBank;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ các Nghị định hướng dẫn (kê chi tiết các nghị định liên quan);',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Quy định về Quản lý hoạt động đầu tư xây dựng công trình ban hành kèm theo Quyết định số 108/CS-HĐQT-NHCT-MSTS2 ngày 21/03/2023 của HĐQT VietinBank;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Quyết định số ……. của …… v/v phê duyệt dự án đầu tư xây dựng công trình …;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Báo cáo kiểm toán độc lập ………..;',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Thông báo kết luận kiểm toán của Kiểm toán nhà nước (nếu có);',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Tờ trình ngày … của Chủ đầu tư về việc phê duyệt quyết toán dự án …,',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Căn cứ Báo cáo thẩm tra quyết toán dự án hoàn thành ngày …của HĐTĐ…',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.CENTER,
						spacing: {
							after: 50,
						},
						children: [
							new TextRun({
								text: 'QUYẾT ĐỊNH',
								bold: true,
								size: 28,
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Điều 1.',
								bold: true,
								size: 28,
							}),
							new TextRun({
								text: 'Phê duyệt quyết toán dự án (dự án thành phần, tiểu dự án độc lập, công trình, hạng mục công trình) hoàn thành',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '- Tên dự án (hoặc dự án thành phần, tiểu dự án độc lập, công trình, hạng mục công trình độc lập) hoàn thành:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '- Chủ đầu tư:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '- Địa điểm xây dựng:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '- Thời gian khởi công, hoàn thành (thực tế):',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Điều 2.',
								bold: true,
								size: 28,
							}),
							new TextRun({
								text: 'Kết quả đầu tư:',
								size: 28,
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '1.Nguồn vốn đầu tư:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.RIGHT,
						children: [new TextRun({text: 'Đơn vị tính: đồng', size: 24})],
					}),
					new Table({
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
							// Hàng đầu tiên
							new TableRow({
								children: [
									new TableCell({
										rowSpan: 2,
										width: {size: 8, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('Nguồn vốn')],
											}),
										],
									}),
									new TableCell({
										rowSpan: 2,
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun(
														`TMĐT dự án, dự án thành phần, tiểu dự án độc lập, hoặc DT công trình, hạng mục công trình được duyệt hoặc điều chỉnh lần cuối`
													),
												],
											}),
										],
									}),
									new TableCell({
										rowSpan: 2,
										width: {size: 18, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Giá trị phê duyệt quyết toán`)],
											}),
										],
									}),
									new TableCell({
										columnSpan: 2,
										width: {size: 27, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Thực hiện`)],
											}),
										],
									}),
								],
							}),
							// Hàng con của "Thực hiện"
							new TableRow({
								children: [
									new TableCell({
										width: {size: 13.5, type: WidthType.PERCENTAGE},
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Số vốn đã thanh toán`)],
											}),
										],
									}),
									new TableCell({
										width: {size: 13.5, type: WidthType.PERCENTAGE},
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Còn được thanh toán`)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('1')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('2')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('3')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('4')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('4 = 3 - 4')]})],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('Tổng số')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('')]})],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										children: [
											new Paragraph({
												alignment: AlignmentType.JUSTIFIED,
												children: [new TextRun('Nguồn vốn đầu tư, mua sắm TSCĐ của VietinBank')],
											}),
											new Paragraph({
												alignment: AlignmentType.JUSTIFIED,
												children: [new TextRun('Nguồn vốn khác (nếu có)')],
											}),
										],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('')]})],
									}),
									new TableCell({
										children: [new Paragraph({alignment: AlignmentType.CENTER, children: [new TextRun('')]})],
									}),
								],
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '2.Chi phí đầu tư:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.RIGHT,
						children: [new TextRun({text: 'Đơn vị tính: đồng', size: 24})],
					}),
					new Table({
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
							// Hàng đầu tiên
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('Nội dung')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun(
														`TMĐT dự án, dự án thành phần, tiểu dự án độc lập, hoặc DT công trình, hạng mục công trình được duyệt hoặc điều chỉnh lần cuối`
													),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`Giá trị quyết toán`)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('1')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`2`)],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(`3`)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('Tổng số')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('1.Bồi thường, hỗ trợ.TĐC')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('2. Xây dựng')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('3. Thiết bị')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('4. Quản lý dự án')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('5. Tư vấn')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('6. Chi phí khác')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('7. Dự phòng')],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun(``)],
											}),
										],
									}),
								],
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '3.',
								bold: true,
							}),
							new TextRun({
								text: 'Chi phí đầu tư được phép không tính vào giá trị tài sản:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '3.1.Chi phí thiệt hại do các nguyên nhân bất khả kháng:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '3.2.Chi phí không tạo nên tài sản:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '4.',
								bold: true,
							}),
							new TextRun({
								text: 'Giá trị tài sản hình thành sau đầu tư:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.RIGHT,
						children: [new TextRun({text: 'Đơn vị tính: đồng', size: 24})],
					}),
					new Table({
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
							// Hàng tiêu đề đầu tiên
							new TableRow({
								children: [
									new TableCell({
										rowSpan: 2,
										width: {size: 20, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'Nội dung', bold: true})],
											}),
										],
									}),
									new TableCell({
										columnSpan: 2,
										width: {size: 40, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'Thuộc chủ đầu tư quản lý', bold: true})],
											}),
										],
									}),
									new TableCell({
										columnSpan: 2,
										width: {size: 40, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'Giao đơn vị khác quản lý', bold: true})],
											}),
										],
									}),
								],
							}),

							// Hàng tiêu đề thứ hai
							new TableRow({
								children: [
									new TableCell({
										width: {size: 20, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('Giá trị thực tế')],
											}),
										],
									}),
									new TableCell({
										width: {size: 20, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('Giá trị quy đổi\n(nếu có)')],
											}),
										],
									}),
									new TableCell({
										width: {size: 20, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('Giá trị thực tế')],
											}),
										],
									}),
									new TableCell({
										width: {size: 20, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('Giá trị quy đổi\n(nếu có)')],
											}),
										],
									}),
								],
							}),

							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('1')],
											}),
										],
									}),
									...Array(4).fill(
										new TableCell({
											children: [new Paragraph('')],
										})
									),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('Tổng số')],
											}),
										],
									}),
									...Array(4).fill(
										new TableCell({
											children: [new Paragraph('')],
										})
									),
								],
							}),

							// Hàng "1. Tài sản dài hạn (tài sản cố định)"
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('1. Tài sản dài hạn (tài sản cố định)')],
											}),
										],
									}),
									...Array(4).fill(
										new TableCell({
											children: [new Paragraph('')],
										})
									),
								],
							}),

							// Hàng "2. Tài sản ngắn hạn"
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [new TextRun('2. Tài sản ngắn hạn')],
											}),
										],
									}),
									...Array(4).fill(
										new TableCell({
											children: [new Paragraph('')],
										})
									),
								],
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '5.Vật tư thiết bị tồn đọng:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Điều 3.',
								bold: true,
							}),
							new TextRun({
								text: 'Trách nhiệm của chủ đầu tư và các đơn vị liên quan:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '1.Trách nhiệm của chủ đầu tư:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '1.1.Được phép tất toán nguồn và chi phí đầu tư là:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.RIGHT,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Đơn vị tính: đồng',
							}),
						],
					}),
					new Table({
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
							// Hàng đầu tiên
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'Nguồn',
														bold: true,
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'Số tiền',
														bold: true,
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'Ghi chú',
														bold: true,
													}),
												],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'Tổng số',
														bold: true,
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												children: [
													new TextRun({
														text: 'Nguồn vốn đầu tư, mua sắm TSCĐ của VietinBank',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												children: [
													new TextRun({
														text: 'Nguồn vốn khác (nếu có)',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
								],
							}),
						],
					}),

					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '1.2. Tổng các khoản công nợ tính đến ngày ... tháng ... năm ... là: ……đồng.',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '+Tổng nợ phải thu: ……………đồng.',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '+Tổng nợ phải trả: ……………đồng.',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Chi tiết các khoản công nợ theo số phải thu, phải trả của từng đơn vị tại Mẫu số: …. kèm theo.',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '2.Trách nhiệm của đơn vị tiếp nhận tài sản:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Được phép ghi tăng tài sản:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.RIGHT,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Đơn vị tính: đồng',
								size: 24,
							}),
						],
					}),
					new Table({
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
							// Hàng đầu tiên
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'Tên đơn vị tiếp nhận tài sản',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'Tài sản dài hạn/cố định',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: 'Tài sản ngắn hạn',
													}),
												],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '1',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '2',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '3',
													}),
												],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
								],
							}),
							new TableRow({
								children: [
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
									new TableCell({
										verticalAlign: VerticalAlign.CENTER,
										children: [
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '',
													}),
												],
											}),
										],
									}),
								],
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '3.Trách nhiệm của các đơn vị, cơ quan có liên quan:',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: '4.Các nghiệp vụ thanh toán khác (nếu có):',
							}),
						],
					}),
					new Paragraph({
						alignment: AlignmentType.JUSTIFIED,
						indent: {firstLine: 400},
						children: [
							new TextRun({
								text: 'Điều 4:',
								bold: true,
							}),
							new TextRun({
								text: 'Trách nhiệm thi hành',
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
												children: [new TextRun({text: 'Nơi nhận', bold: true, italics: true, size: 24})],
											}),
										],
									}),
									// Cột bên phải
									new TableCell({
										width: {size: 50, type: WidthType.PERCENTAGE},
										verticalAlign: VerticalAlign.TOP,
										children: [
											new Paragraph({
												spacing: {
													before: 300,
													after: 50,
												},
												alignment: AlignmentType.CENTER,
												children: [new TextRun({text: 'NGƯỜI CÓ THẨM QUYỀN PHÊ DUYỆT QUYẾT TOÁN', bold: true})],
											}),
											new Paragraph({
												alignment: AlignmentType.CENTER,
												children: [
													new TextRun({
														text: '(Ký, đóng dấu, ghi rõ họ tên)',
														size: 24,
														italics: true,
													}),
												],
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
