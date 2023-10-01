
const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-Rose-800 px-8 md:px-[100px] flex flex-col md:flex-row justify-between items-start text-sm py-8">
        <div className="flex flex-col text-Rose-100 py-1">
          <p>Feature Blog</p>
          <p>Most viewed</p>
          <p>Readers choice</p>
        </div>

        <div className="flex flex-col text-Rose-100 py-1">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent post</p>
        </div>

        <div className="flex flex-col text-Rose-100 py-1">
          <p>Privacy policy</p>
          <p>About us</p>
          <p>Terms and Condition</p>
          <p>Terms of services</p>
        </div>
      </div>
      <p className="py-2 pb-2 text-Rose-50 bg-Rose-950">All rights reserved @BlogPost 2023</p>
    </>
  )
}

export default Footer

