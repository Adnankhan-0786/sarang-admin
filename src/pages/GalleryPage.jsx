import { useState } from "react"
import { IMGS } from "../assets/images"

// Pehle ka DOCS aur STEPS aapne include kiya tha, agar future me use ho sakta hai
const DOCS = [
  ['fa-file-alt', 'Birth Certificate — Original birth certificate issued by Municipal Corporation or Gram Panchayat'],
  ['fa-id-card', 'Aadhar Card — Aadhar card of student and parents/guardians'],
  ['fa-graduation-cap', 'Previous School Records — Report card and Transfer Certificate from last school attended'],
  ['fa-camera', 'Passport Photos — 4 recent passport-size photographs of the student'],
  ['fa-home', 'Residence Proof — Any government-issued address proof of parents'],
  ['fa-user-tie', 'Parent ID Proof — Government-issued photo ID of parent/guardian'],
  ['fa-heartbeat', 'Medical Certificate — Health certificate from a registered medical practitioner'],
]

const STEPS = [
  ['Fill Registration Form', 'Complete the online or offline registration form with all required details.'],
  ['Submit Documents', 'Submit all required documents at the school office or via email.'],
  ['Interview & Assessment', 'Student and parent interaction with school administration.'],
  ['Confirmation & Fee Payment', 'Upon selection, complete fee payment to confirm enrollment.'],
]

export default function GalleryPage({ setPage }) {

  const [openAlbum, setOpenAlbum] = useState(null)
  const [fullscreenImg, setFullscreenImg] = useState(null)

  // Aapke albums
  const GALLERY = [
    {
      title: "Annual Function",
      cover: IMGS.cover2,
      images: [IMGS.cover1, IMGS.cover2, IMGS.cover3, ]
    },
    {
      title: "Sports Day",
      cover: IMGS.icover3,
      images: [IMGS.icover1, IMGS.icover2, IMGS.icover3]
    },
    {
      title: "Independence Day",
      cover: IMGS.scover0,
      images: [IMGS.scover0, IMGS.scover1, IMGS.scover2]
    }
  ]

  return (
    <div>

      {/* Banner */}
      <div className="pb">
        <img src={IMGS.about_banner} alt="Gallery" />
        <div className="pb-ov" />
        <div className="pb-cnt">
          <h1>Gallery</h1>
          <div className="pb-bc">Photos · Memories · Events</div>
        </div>
      </div>

      <section className="section sec-gray">
        <div className="container">

          <div className="sec-hdr">
            <div className="sec-tag">Explore Our Moments</div>
            <h2 className="sec-title">
              Gallery of <span>School Events</span>
            </h2>
            <div className="divider" />
          </div>

          {/* Albums Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "25px",
              marginTop: "40px"
            }}
          >
            {GALLERY.map((album, index) => (
              <div key={index}>

                {/* Album Cover */}
                <div
                  onClick={() =>
                    setOpenAlbum(openAlbum === index ? null : index)
                  }
                  style={{
                    cursor: "pointer",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.15)"
                  }}
                >
                  <img
                    src={album.cover}
                    alt={album.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover"
                    }}
                  />

                  <div
                    style={{
                      padding: "15px",
                      textAlign: "center",
                      fontWeight: "700",
                      fontSize: "18px"
                    }}
                  >
                    {album.title}
                  </div>
                </div>

                {/* Thumbnails */}
                {openAlbum === index && (
                  <div
                    style={{
                      marginTop: "15px",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
                      gap: "10px"
                    }}
                  >
                    {album.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        onClick={() => setFullscreenImg(img)}
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          cursor: "zoom-in"
                        }}
                      />
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Fullscreen Modal */}
      {fullscreenImg && (
        <div
          onClick={() => setFullscreenImg(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "zoom-out"
          }}
        >
          <img
            src={fullscreenImg}
            alt=""
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "8px",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }}
          />
        </div>
      )}

    </div>
  )
}