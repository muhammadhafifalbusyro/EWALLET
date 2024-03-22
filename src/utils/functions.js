const formatToRupiah = (value = '0') => {
    const stringValue = value.toString();
    const splitValue = stringValue.split('');
    let rupiah = '';
    let count = 0;

    for (let i = splitValue.length - 1; i >= 0; i--) {
        rupiah = splitValue[i] + rupiah;
        count++;
        if (count % 3 === 0 && i !== 0) rupiah = '.' + rupiah;
    }
    if(rupiah == ''){
        return `${rupiah}`
    }
    return `Rp ${rupiah}`;
};

const convertToNumber = (valueRupiah) => {
    // Hapus karakter non-digit (spasi dan titik)
    const numericValue = valueRupiah.replace(/[^\d]/g, '');
  
    // Parse string numerik menjadi angka
    return parseInt(numericValue);
  }

export {formatToRupiah, convertToNumber}
