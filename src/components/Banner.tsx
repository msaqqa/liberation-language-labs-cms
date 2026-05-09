import Link from 'next/link'

export default function Banner({ title }: { title: string }) {
  return (
    <section className="page_banner decoration_wrapper">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="page_title mb-0">{title}</h1>
          </div>
          <div className="col-lg-6">
            <ul className="breadcrumb_nav unordered_list justify-content-lg-end justify-content-center">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>{title}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="decoration_item shape_leaf_1">
        <img src="/assets/images/shapes/shape_leaf_left.svg" alt="Shape Leaf" />
      </div>
      <div className="decoration_item shape_leaf_2">
        <img src="/assets/images/shapes/shape_leaf_right.svg" alt="Shape Leaf" />
      </div>
    </section>
  )
}
