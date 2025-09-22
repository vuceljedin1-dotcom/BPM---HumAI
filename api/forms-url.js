export default async function handler(req,res){
  res.status(200).json({ url: process.env.GOOGLE_FORM_URL || 'https://forms.gle/KkTYVmAayn6rMnoHA' });
}
