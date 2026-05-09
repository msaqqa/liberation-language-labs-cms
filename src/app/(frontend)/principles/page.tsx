import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Banner from '@/components/Banner'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function PrinciplesPage() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({
    slug: 'principles-page',
  })

  return (
    <>
      {/* Page Banner */}
      <Banner title={data.banner.title} />

      {/* Page Content */}
      <section className="service_details_section section_space_lg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="details_content">
                <h2 className="details_item_title">{data.statement.title}</h2>
                {data.statement.content && typeof data.statement.content === 'object' && (
                  <div className="section_heading_description">
                    <RichText data={data.statement.content} />
                  </div>
                )}

                <h3 className="details_info_title">{data.commitment.title}</h3>
                {data.commitment.content && typeof data.commitment.content === 'object' && (
                  <div className="section_heading_description">
                    <RichText data={data.commitment.content} />
                  </div>
                )}

                <h3 className="details_info_title">{data.strive.title}</h3>
                <ul className="info_list unordered_list_block mb-4">
                  {((data.strive.list as any) || []).map((item: any, index: number) => (
                    <li key={index}>
                      <span className="info_icon">
                        <i className="fa-light fa-circle-check"></i>
                      </span>
                      <span className="info_text">{item.item}</span>
                    </li>
                  ))}
                </ul>
                {data.strive.content && typeof data.strive.content === 'object' && (
                  <div className="section_heading_description">
                    <RichText data={data.strive.content} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
