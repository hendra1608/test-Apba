function angkaToTerbilang(nominal) {
  const satuan = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];

  function konversi(n) {
    let str = "";

    if (n < 12) {
      str = satuan[n];
    } else if (n < 20) {
      str = konversi(n - 10) + " Belas";
    } else if (n < 100) {
      str =
        konversi(Math.floor(n / 10)) +
        " Puluh" +
        (n % 10 !== 0 ? " " + konversi(n % 10) : "");
    } else if (n < 200) {
      str = "Seratus" + (n - 100 !== 0 ? " " + konversi(n - 100) : "");
    } else if (n < 1000) {
      str =
        konversi(Math.floor(n / 100)) +
        " Ratus" +
        (n % 100 !== 0 ? " " + konversi(n % 100) : "");
    } else if (n < 2000) {
      str = "Seribu" + (n - 1000 !== 0 ? " " + konversi(n - 1000) : "");
    } else if (n < 1000000) {
      str =
        konversi(Math.floor(n / 1000)) +
        " Ribu" +
        (n % 1000 !== 0 ? " " + konversi(n % 1000) : "");
    } else if (n < 1000000000) {
      str =
        konversi(Math.floor(n / 1000000)) +
        " Juta" +
        (n % 1000000 !== 0 ? " " + konversi(n % 1000000) : "");
    } else if (n < 1000000000000) {
      str =
        konversi(Math.floor(n / 1000000000)) +
        " Miliar" +
        (n % 1000000000 !== 0 ? " " + konversi(n % 1000000000) : "");
    } else {
      str = "Angka terlalu besar";
    }

    return str;
  }

  nominal = nominal.replace(/[^0-9,]/g, "").replace(",", ".");
  const [intPart, decPart] = nominal.split(".");

  let hasil = konversi(parseInt(intPart));
  if (decPart && parseInt(decPart) > 0) {
    hasil += " Koma " + konversi(parseInt(decPart)) + " Rupiah";
  }

  return hasil;
}

console.log(angkaToTerbilang("Rp.10.113.199,50"));
