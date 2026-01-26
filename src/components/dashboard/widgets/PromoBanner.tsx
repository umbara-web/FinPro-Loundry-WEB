'use client';

export function PromoBanner() {
  return (
    <div className='relative mt-2 flex min-h-35 items-center overflow-hidden rounded-xl bg-linear-to-r bg-[url("https://www.transparenttextures.com/patterns/cubes.png")] from-blue-600 to-indigo-700'>
      <PromoContent />
      <PromoImage />
    </div>
  );
}

function PromoContent() {
  return (
    <div className='relative z-10 flex max-w-[70%] flex-col items-start gap-2 p-6'>
      <span className='rounded bg-orange-700 px-2 py-1 text-[10px] font-bold tracking-wider text-black uppercase dark:text-white'>
        Promo Spesial
      </span>
      <h3 className='text-xl font-bold text-black dark:text-white'></h3>
      <p className='text-sm text-gray-800/50 dark:text-gray-100'>
        Gunakan kode: BERSIH20. Berlaku sampai akhir bulan.
      </p>
    </div>
  );
}

function PromoImage() {
  const imageUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCGX_4nAIHigejHDYC-iF_pi7swOkxO9m08dmfCj8UJmmBSkL7yGLAzOyYh4OqjWegxC_6NIWbNQbPCIgrpVxuOCb2aDZxtt2lF6NXC2TfmT-0iMwScVycH6j45a4hR7K8_RV_TXkGTMkZLH5ocXlaSMfVWW5iWOp4TFBQel-KaEuIWYwrXZds1J7cAeD747f7tkHZ-DtM5y_bGSKApuol3NFpzjE2BsDNbB749cXfrYh9zPdWO7QfAOaKfUXg5DbKJ-qOQcgzoVfk';

  return (
    <div
      className='absolute right-0 bottom-0 h-full w-[30%] bg-contain bg-bottom-right bg-no-repeat opacity-80'
      style={{ backgroundImage: `url('${imageUrl}')` }}
    ></div>
  );
}
