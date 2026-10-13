import QRCode from 'qrcode';

export function isExitTicketSlide(title = '', archetype = '') {
  return archetype === 'closing' || /exit ticket|summative|reflection/i.test(title);
}

export async function createExitTicketQr(studentUrl: string) {
  const url = new URL(studentUrl);
  url.searchParams.set('exitTicket', '1');
  return {
    url: url.toString(),
    image: await QRCode.toDataURL(url.toString(), { width: 320, margin: 2 }),
  };
}
