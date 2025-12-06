// geocoder.ts
export const YANDEX_GEOCODER_API_KEY = "a4a7cd16-4874-4753-80aa-10d586ee8c58";

export async function getAddressFromYandex(latitude: number, longitude: number): Promise<string> {
  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${longitude},${latitude}&lang=ru_RU&apikey=${YANDEX_GEOCODER_API_KEY}&results=1`
    );
    const data = await response.json();
    if (data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject) {
      const geoObject = data.response.GeoObjectCollection.featureMember[0].GeoObject;
      const address = geoObject.metaDataProperty?.GeocoderMetaData?.text;
      if (address) {
        return address;
      }
    }
    return `г. Москва (приблизительно: ${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
  } catch (error) {
    console.error("Ошибка Яндекс геокодирования:", error);
    return `г. Москва (координаты: ${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
  }
}

export async function getLocationByIP(): Promise<{lat: number, lon: number, city: string} | null> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    if (data.latitude && data.longitude) {
      return {
        lat: data.latitude,
        lon: data.longitude,
        city: data.city || "Неизвестный город"
      };
    }
  } catch (error) {
    console.error("Ошибка IP-геолокации:", error);
  }
  return null;
}
