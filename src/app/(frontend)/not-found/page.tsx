import Link from 'next/link'

export default function FrontendNotFoundPage() {
  return (
    <section className="error_section decoration_wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 text-center">
            <h1>404</h1>
            <h2>Oops! That Page Can’t be Found</h2>
            <p>
              It looks like the link you followed might be broken or the page has been moved. Let's
              get you back on track to exploring our speech therapy resources and blogs!
            </p>
            <div className="btn_wrap pb-0 text-center">
              <Link className="btn btn-primary" href="/">
                <span className="btn_icon me-2 ms-0">
                  <i className="fa-solid fa-arrow-up-left"></i>{' '}
                </span>
                <span className="btn_text" data-text="Back to Home Page">
                  Back to Home Page
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="decoration_item shape_leaf_1">
        <img
          src="/assets/images/shapes/shape_leaf_left_bottom.svg"
          alt="Shape Leaf - Talking Minds - Psychotherapist Site Template"
        />
      </div>
      <div className="decoration_item shape_leaf_2">
        <img
          src="/assets/images/shapes/shape_leaf_right_top.svg"
          alt="Shape Leaf - Talking Minds - Psychotherapist Site Template"
        />
      </div>
    </section>
  )
}
