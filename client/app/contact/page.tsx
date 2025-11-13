export default function ContactPage() {
  const staff = [
    {
      title: 'Head of Studio',
      members: [
        {
          name: 'Cyril Bordesoulle',
          email: 'cyril@posterco.tv',
        },
      ],
    },
    {
      title: 'Head of Post-Production',
      members: [
        {
          name: 'Yéléna Dos Santos',
          email: 'ydossantos@posterco.tv',
        },
      ],
    },
  ]

  return (
    <div className="template-contact body-light">
      <div className="page-inner-content px-4 md:px-8">
        <h1 className="hidden">Contact</h1>

        <div className="contact-inner-wrapper max-w-4xl mx-auto py-20 grid md:grid-cols-2 gap-12">
          <div className="box box--staff">
            <ul className="list list--staff space-y-8">
              {staff.map((dept, index) => (
                <li key={index}>
                  <h2 className="text-xl font-monument mb-4">{dept.title}</h2>
                  <ul className="list list--members space-y-2">
                    {dept.members.map((member, idx) => (
                      <li key={idx} className="text-base">
                        {member.name}
                        <br />
                        <a
                          className="lnk lnk--through hover:opacity-70 transition-smooth"
                          href={`mailto:${member.email}`}
                        >
                          {member.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="box box--address">
            <p className="text-base leading-relaxed mb-6">
              72 bld de Sébastopol
              <br />
              Paris 75003
            </p>

            <p className="text-base">
              T&nbsp;:{' '}
              <a
                className="lnk lnk--through hover:opacity-70 transition-smooth"
                href="tel:+330148019966"
              >
                +33 (0)1 48 01 99 66
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
