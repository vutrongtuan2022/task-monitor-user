// Hàm chuyển đổi số coin thành chuỗi định dạng tiền tệ
export const convertCoin = (coin: number | null) => {
	return coin ? coin.toLocaleString('de-DE', {maximumFractionDigits: 2}) : '0';
};

// Hàm chuyển đổi chuỗi hoặc số thành giá trị số
export const price = (value: string | number): number => {
	const numericValue = Number(`${value}`.replace(/[^0-9,]/g, '').replace(',', '.'));
	return isNaN(numericValue) ? 0 : numericValue;
};

// Hàm đảm bảo giá trị phần trăm nằm trong khoảng từ 0 đến 100
export const specification = (value: number): number => {
	if (value < 0) {
		return 0;
	}
	if (value > 100) {
		return 100;
	}
	return value;
};

export const convertCoinBet = (coin: number) => {
	if (coin >= 1000 && coin < 10000) {
		return convertCoin(coin);
	}
	if (coin >= 10000 && coin < 1000000) {
		return `${(coin / 1000).toFixed(1).replace('.', ',')}K`;
	}
	if (coin >= 1000000 && coin < 1000000000) {
		return `${(coin / 1000000).toFixed(1).replace('.', ',')}M`;
	}
	if (coin >= 1000000000) {
		return `${(coin / 1000000000).toFixed(1).replace('.', ',')}B`;
	}

	return coin.toLocaleString('de-DE');
};

export function numberToWords(number: number) {
	if (typeof number !== 'number' || isNaN(number)) {
		return 'Không hợp lệ';
	}

	if (number === 0) {
		return 'Không đồng';
	}

	const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
	const levels = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];

	function readThreeDigits(num: number) {
		let str = '';
		const hundred = Math.floor(num / 100);
		const ten = Math.floor((num % 100) / 10);
		const unit = num % 10;

		if (hundred > 0) {
			str += units[hundred] + ' trăm';
			if (ten === 0 && unit > 0) str += ' linh';
		}

		if (ten > 1) {
			str += ' ' + units[ten] + ' mươi';
			if (unit === 1) str += ' mốt';
			else if (unit === 5) str += ' lăm';
			else if (unit > 0) str += ' ' + units[unit];
		} else if (ten === 1) {
			str += ' mười';
			if (unit > 0) str += ' ' + units[unit];
		} else if (unit > 0) {
			str += ' ' + units[unit];
		}

		return str.trim();
	}

	function splitIntoChunks(num: number) {
		const chunks = [];
		while (num > 0) {
			chunks.push(num % 1000);
			num = Math.floor(num / 1000);
		}
		return chunks;
	}

	const chunks = splitIntoChunks(number);
	let result = '';

	for (let i = chunks.length - 1; i >= 0; i--) {
		if (chunks[i] > 0) {
			result += readThreeDigits(chunks[i]) + ' ' + levels[i] + ' ';
		}
	}

	result = result.trim().replace(/\s+/g, ' ');
	result = result.charAt(0).toUpperCase() + result.slice(1) + ' đồng';
	return result;
}
