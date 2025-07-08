import axios from 'axios';
import FormData from 'form-data';
import FileType from 'file-type';

export async function uploadToNekochii(buffer) {
  const type = await FileType.fromBuffer(buffer);
  const form = new FormData();

  form.append('file', buffer, {
    filename: 'upload.' + (type?.ext || 'bin'),
    contentType: type?.mime || 'application/octet-stream',
  });

  const { data } = await axios.post('https://nekochii-up.hf.space/upload', form, {
    headers: form.getHeaders(),
    maxBodyLength: Infinity,
  });

  if (!data?.success) throw new Error(data.message || 'Upload failed.');
  return data;
}