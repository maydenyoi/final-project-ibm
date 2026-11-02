/* ============================================================
   TikTok Content Booster — script.js  (v3)
   Perubahan: tone keys diperbarui, label badge tanpa emoji,
              TEMPLATES ditulis ulang — alami, tanpa AI slang
   ============================================================ */

'use strict';

/* ============================================================
   1. LABEL MAPS — Human-readable labels untuk badge & riwayat
   ============================================================ */

const NICHE_LABELS = {
  edukasi:      'Edukasi',
  gaming:       'Gaming',
  lifestyle:    'Lifestyle',
  tech:         'Tech',
  storytelling: 'Storytelling',
};

const TONE_LABELS = {
  casual:        'Casual & Trendy',
  witty:         'Witty & Humorous',
  formal:        'Professional',
  inspirational: 'Inspirational',
};

/* ============================================================
   2. TEMPLATE DATA — TEMPLATES[niche][tone]
      Setiap entri: hooks[], captionTemplate(topic), hashtags[]
      Prinsip penulisan:
        - Terdengar seperti manusia, bukan generator teks
        - Emoji maksimal 1–2 per kalimat, tidak berlebihan
        - Bahasa kasual = percakapan, bukan slang dipaksakan
        - Bahasa formal = jernih, langsung, berbobot
   ============================================================ */

const TEMPLATES = {

  /* ================================================================
     EDUKASI
     ================================================================ */
  edukasi: {

    casual: {
      hooks: [
        "Kebanyakan orang salah paham soal {topic} — dan itu bukan salah mereka sepenuhnya.",
        "Gue pernah belajar {topic} dengan cara yang salah selama berbulan-bulan. Ini yang seharusnya gue tau dari awal.",
        "Ada satu konsep di {topic} yang hampir semua tutorial lewati begitu saja — padahal ini yang paling penting.",
        "Kalau kamu merasa {topic} itu susah, kemungkinan besar kamu belum ketemu penjelasan yang tepat.",
        "Gue rangkum {topic} jadi 3 poin yang bisa kamu pahami dalam 60 detik.",
        "Bukan kurang pintar, tapi kurang konteks — ini cara paling efektif belajar {topic}.",
      ],
      captionTemplate: (topic) =>
`Kalau kamu pernah merasa stuck belajar ${topic}, kamu tidak sendirian.

Masalahnya bukan kemampuan — tapi cara penyampaian yang sering terlalu teknis dan tidak kontekstual.

Di video ini gue coba breakdown dengan cara yang lebih manusiawi: mulai dari kenapa ini penting, baru masuk ke caranya.

Simpan video ini buat dibuka lagi kalau kamu butuh pengingat.

Like kalau ini bantu, dan follow untuk konten serupa.`,
      hashtags: ['#belajar', '#edukasi', '#tips', '#selfimprovement', '#ilmugratis'],
    },

    witty: {
      hooks: [
        "Selamat, kamu baru saja menemukan tutorial {topic} yang tidak akan bikin kamu mengantuk.",
        "Gue jelasin {topic} pake analogi yang agak absurd — tapi entah kenapa malah nyangkut di otak.",
        "Kalau {topic} bisa dijelaskan pake cerita soal antrian warung, gue yang paling cocok ngejelasinnya.",
        "{topic} itu sebenernya simpel. Yang bikin susah adalah orang yang jelasinnya pakai bahasa buku teks.",
        "Dua jenis orang: yang ngerti {topic} dan yang belum ketemu video ini.",
        "Cara cepat ngerti {topic}: lupain semua yang diajarkan guru. Mulai dari sini.",
      ],
      captionTemplate: (topic) =>
`Oke, jujur — gue juga dulu ngerasa ${topic} itu intimidating.

Tapi setelah gue sadari bahwa masalahnya ada di cara penjelasan (bukan di materinya), semuanya jadi jauh lebih masuk akal.

Jadi di sini gue coba versi yang lebih… manusiawi. Pakai analogi, cerita, dan sesekali jokes yang kualitasnya gue jamin tidak lebih buruk dari buku pelajaran.

Komen kalau ada bagian yang masih bikin bingung — gue baca semuanya.`,
      hashtags: ['#edukasi', '#belajarseru', '#tips', '#relatable', '#fyp'],
    },

    formal: {
      hooks: [
        "Panduan {topic} yang disusun secara sistematis — dari konsep dasar hingga penerapan.",
        "Memahami {topic} dengan benar adalah investasi yang hasilnya terasa bertahun-tahun ke depan.",
        "Video ini membahas {topic} secara menyeluruh: apa yang perlu dipahami, dan bagaimana menerapkannya.",
        "{topic} adalah fondasi yang sering diabaikan. Video ini hadir untuk mengisi celah tersebut.",
        "Penjelasan {topic} yang akurat, terstruktur, dan langsung relevan dengan kebutuhan sehari-hari.",
        "Sebelum melangkah lebih jauh, pastikan pemahaman dasar {topic} Anda sudah solid.",
      ],
      captionTemplate: (topic) =>
`Konten ini membahas ${topic} secara terstruktur dan berbasis bukti.

Saya percaya bahwa pemahaman yang kuat terhadap fondasi adalah kunci dari segala bentuk kemajuan. Itulah mengapa video ini dirancang untuk membangun pemahaman dari dasar, bukan sekadar memberikan rangkuman permukaan.

Materi mencakup: konsep inti, konteks penerapan, dan kesalahan umum yang perlu dihindari.

Silakan ajukan pertanyaan di kolom komentar — diskusi yang baik adalah bagian dari proses belajar.

Follow untuk konten edukasi berkualitas lainnya.`,
      hashtags: ['#edukasi', '#belajar', '#ilmupengetahuan', '#informatif', '#tutorial'],
    },

    inspirational: {
      hooks: [
        "Menguasai {topic} bukan soal seberapa cepat kamu belajar — tapi seberapa kamu mau tetap konsisten.",
        "Setiap orang yang ahli di {topic} pernah berada tepat di posisi kamu sekarang.",
        "Belajar {topic} adalah salah satu keputusan terbaik yang bisa kamu buat untuk dirimu sendiri.",
        "Jangan ukur kemajuanmu belajar {topic} dengan orang lain — ukur dengan versi dirimu kemarin.",
        "Ada yang bilang {topic} itu sulit. Tapi sulit bukan berarti tidak mungkin — hanya butuh proses.",
        "Setiap menit yang kamu investasikan untuk memahami {topic} tidak akan pernah terbuang sia-sia.",
      ],
      captionTemplate: (topic) =>
`Perjalanan belajar ${topic} itu tidak linear — dan tidak seharusnya.

Ada hari di mana semuanya terasa klik, ada hari di mana kamu ingin berhenti. Keduanya normal.

Yang membedakan mereka yang akhirnya mahir adalah bukan bakat — tapi kemauan untuk terus kembali setelah berhenti sejenak.

Video ini untuk kamu yang sedang di tengah proses itu. Teruslah.

Like dan follow jika konten ini memberikan perspektif baru buatmu.`,
      hashtags: ['#motivasi', '#belajar', '#mindset', '#edukasi', '#selfimprovement'],
    },
  },

  /* ================================================================
     GAMING
     ================================================================ */
  gaming: {

    casual: {
      hooks: [
        "Satu kebiasaan kecil yang mengubah cara gue main {topic} — dan hasilnya terasa dalam seminggu.",
        "Kalau rank kamu di {topic} stagnan, kemungkinan besar ini penyebabnya.",
        "Gue pelajari cara main {topic} dari pro player — ini yang paling bisa langsung diterapkan.",
        "Setup {topic} yang gue pakai saat ini bukan yang paling mahal, tapi yang paling efektif.",
        "Ada satu aspek {topic} yang hampir semua pemain abaikan — padahal ini yang paling berpengaruh.",
        "Dari stuck di rank yang sama selama tiga bulan, sampai akhirnya naik — ini yang berubah.",
      ],
      captionTemplate: (topic) =>
`Jujur, gue juga pernah di titik di mana main ${topic} rasanya sia-sia.

Setelah evaluasi gameplay sendiri, ternyata ada beberapa kebiasaan kecil yang tanpa sadar menghambat perkembangan — dan itu bukan soal mekanik.

Di video ini gue share apa yang benar-benar berubah. Bukan teori, tapi hal yang bisa langsung dicoba.

Berapa rank kamu sekarang? Drop di komentar — mungkin gue bisa kasih masukan spesifik.

Like dan follow untuk konten ${topic} lainnya.`,
      hashtags: ['#gaming', '#gamer', '#tipsgaming', '#ranked', '#fyp'],
    },

    witty: {
      hooks: [
        "Panduan {topic} untuk mereka yang sudah menyalahkan koneksi internet terlalu lama.",
        "Gue kalah ribuan kali di {topic}. Anggap video ini sebagai hasil riset yang mahal.",
        "Ada dua tipe pemain {topic}: yang paham meta, dan yang masih pakai build dari 2019.",
        "Setelah ratusan jam di {topic}, gue akhirnya sadar — masalahnya bukan ping.",
        "Tutorial {topic} yang tidak akan bilang 'ini mudah!' di menit pertama.",
        "Kalau kamu pernah blame tim di {topic}, video ini khusus untuk kamu. Dengan penuh kasih sayang.",
      ],
      captionTemplate: (topic) =>
`Baik, mari kita jujur soal ${topic}.

Gue sudah menghabiskan lebih banyak waktu dari yang seharusnya di game ini, dan dari semua jam tersebut, ada beberapa pelajaran yang hanya bisa dipahami lewat kekalahan yang memalukan.

Video ini adalah rangkuman dari semua itu — dikemas supaya kamu tidak perlu mengalami hal yang sama.

Komen dengan rank kamu sekarang. Kalau ternyata di bawah gue, kita bisa saling menyemangati.`,
      hashtags: ['#gaming', '#relatable', '#gamer', '#tipsgaming', '#fyp'],
    },

    formal: {
      hooks: [
        "Analisis mendalam mengenai strategi {topic} yang digunakan oleh pemain tingkat kompetitif.",
        "Panduan peningkatan performa {topic} yang berbasis pada pola permainan dan pengambilan keputusan.",
        "Evaluasi setup dan konfigurasi {topic} yang optimal berdasarkan data dan pengalaman aktual.",
        "Membahas aspek fundamental {topic} yang sering luput dari perhatian pemain di semua level.",
        "Kajian tentang meta {topic} terkini dan implikasinya terhadap gaya bermain yang efektif.",
        "Panduan sistematis untuk meningkatkan konsistensi dan performa dalam {topic}.",
      ],
      captionTemplate: (topic) =>
`Konten ini membahas ${topic} dari sudut pandang yang lebih analitis.

Alih-alih sekadar memberikan tips permukaan, saya mendekatinya dengan menelaah pola permainan, pengambilan keputusan di situasi kritis, dan faktor-faktor yang membedakan pemain rata-rata dari pemain yang konsisten.

Materi ini relevan untuk pemain yang serius ingin berkembang, bukan sekadar naik rank.

Pertanyaan dan diskusi dipersilakan di kolom komentar.

Follow untuk konten gaming yang lebih substansial.`,
      hashtags: ['#gaming', '#esports', '#gaminganalysis', '#ranked', '#competitive'],
    },

    inspirational: {
      hooks: [
        "Rank bukan cerminan seberapa pintar kamu — tapi seberapa kamu mau belajar dari setiap pertandingan.",
        "Setiap pemain pro di {topic} pernah ada di titik di mana mereka ingin berhenti.",
        "Kalah itu tidak menyenangkan. Tapi ada sesuatu yang lebih buruk: kalah tanpa mengambil pelajaran.",
        "Perjalanan dari pemain biasa ke pemain yang ditakuti di {topic} dimulai dari satu keputusan.",
        "Skill di {topic} tidak datang dari bakat — datang dari kemauan untuk terus mengevaluasi diri.",
        "Yang memisahkan pemain baik dari pemain hebat di {topic} bukan jam main — tapi kualitas latihannya.",
      ],
      captionTemplate: (topic) =>
`Satu hal yang ingin saya sampaikan kepada siapa saja yang sedang berjuang di ${topic}:

Kekalahan bukan tanda bahwa kamu tidak berbakat. Itu tanda bahwa kamu sedang belajar.

Pemain terbaik di game apapun bukan mereka yang tidak pernah kalah — tapi mereka yang belajar lebih banyak dari kekalahannya dibanding orang lain dari kemenangannya.

Terus main. Terus evaluasi. Prosesnya tidak selalu mulus, tapi hasilnya nyata.

Like jika ini berbicara ke kamu. Follow untuk perjalanan gaming yang lebih bermakna.`,
      hashtags: ['#gaming', '#mindsetgaming', '#gamerlife', '#motivasi', '#esports'],
    },
  },

  /* ================================================================
     LIFESTYLE
     ================================================================ */
  lifestyle: {

    casual: {
      hooks: [
        "Gue coba satu perubahan kecil soal {topic} dan dampaknya terasa jauh lebih besar dari yang gue sangka.",
        "Kalau kamu merasa {topic} itu ribet, mungkin kamu belum menemukan versi yang cocok untuk kamu.",
        "Bukan soal disiplin penuh waktu — ini soal menemukan ritme {topic} yang sustainable.",
        "Tiga bulan lalu gue mulai serius soal {topic}. Ini yang berubah dan yang tidak.",
        "Tidak ada formula {topic} yang berlaku untuk semua orang — tapi ada prinsip dasarnya.",
        "Gue berhenti ikuti tren {topic} di media sosial dan mulai dengerin apa yang benar-benar kerja.",
      ],
      captionTemplate: (topic) =>
`Hal yang paling membantu gue soal ${topic} bukan tips yang paling sering dibagikan di internet.

Justru yang sederhana, yang konsisten, dan yang tidak terasa seperti hukuman.

Di video ini gue cerita apa yang beneran berubah — tanpa embel-embel dramatis. Termasuk hal yang tidak berhasil, supaya kamu tidak perlu buang waktu mencobanya.

Bagikan pengalaman kamu soal ${topic} di komentar. Gue penasaran apa yang sudah kamu coba.`,
      hashtags: ['#lifestyle', '#tipssehari', '#selfimprovement', '#habit', '#fyp'],
    },

    witty: {
      hooks: [
        "Pinterest dan realita {topic} gue: sebuah gap yang tidak bisa dijembatani dengan aesthetic saja.",
        "Gue sudah mencoba {topic} versi yang viral di internet. Hasilnya jujur dan tidak selalu menggembirakan.",
        "Kalau kamu sudah beli semua perlengkapan {topic} tapi belum mulai — video ini untuk kamu.",
        "Ada dua tipe orang: yang konsisten soal {topic}, dan yang konsisten merencanakan untuk konsisten.",
        "Gue berhasil membangun kebiasaan {topic} yang bertahan — setelah gagal beberapa kali sebelumnya.",
        "Tutorial {topic} yang tidak akan minta kamu bangun jam 4 pagi atau minum sesuatu yang aneh.",
      ],
      captionTemplate: (topic) =>
`Mari kita akui bersama: sebagian besar konten ${topic} di internet terasa lebih cocok untuk influencer dengan 3 asisten pribadi.

Gue di sini dengan versi yang lebih realistis. Yang bisa dilakukan di tengah jadwal yang padat, anggaran yang terbatas, dan motivasi yang naik-turun.

Termasuk momen di mana gue sendiri tidak berhasil — karena jujur itu lebih berguna daripada sempurna.

Komen kalau kamu punya trik ${topic} yang underrated. Gue selalu penasaran.`,
      hashtags: ['#lifestyle', '#relatable', '#habit', '#jujur', '#fyp'],
    },

    formal: {
      hooks: [
        "Pendekatan terstruktur terhadap {topic} yang dapat diterapkan secara konsisten dalam jangka panjang.",
        "Tinjauan berbasis bukti mengenai praktik {topic} yang terbukti efektif dan berkelanjutan.",
        "Membahas {topic} secara objektif: apa yang berhasil, apa yang tidak, dan mengapa.",
        "Panduan {topic} yang disusun berdasarkan penelitian dan pengalaman aktual, bukan tren sesaat.",
        "Bagaimana membangun kebiasaan {topic} yang tidak bergantung pada motivasi — tapi pada sistem.",
        "{topic} yang efektif bukan tentang perubahan drastis — tapi tentang konsistensi yang terukur.",
      ],
      captionTemplate: (topic) =>
`Konten ini membahas ${topic} dengan pendekatan yang berbasis bukti dan dapat diterapkan secara praktis.

Terlalu banyak konten ${topic} yang menjual perubahan instan atau formula universal yang jarang berhasil dalam praktiknya. Pendekatan saya berbeda: dimulai dari pemahaman tentang mengapa suatu kebiasaan berhasil atau gagal, baru kemudian membangun sistem yang sesuai.

Jika Anda mencari panduan ${topic} yang realistis dan terukur, konten ini untuk Anda.

Pertanyaan dan tanggapan dipersilakan di kolom komentar.`,
      hashtags: ['#lifestyle', '#selfimprovement', '#habitbuilding', '#wellness', '#produktif'],
    },

    inspirational: {
      hooks: [
        "Perubahan terbesar dalam hidup gue soal {topic} dimulai dari keputusan yang terasa kecil saat itu.",
        "Tidak ada titik sempurna untuk mulai {topic}. Tapi ada titik yang sudah terlalu lama ditunggu.",
        "Kamu tidak perlu menunggu termotivasi untuk memulai {topic} — motivasi datang setelah kamu mulai.",
        "Versi dirimu yang lebih baik tidak butuh kondisi yang sempurna — hanya langkah pertama.",
        "Gue tidak menyesal satu pun waktu yang gue investasikan untuk {topic}. Tidak ada yang sia-sia.",
        "Hal terberat dari {topic} bukan prosesnya — tapi memutuskan bahwa kamu layak untuk memulainya.",
      ],
      captionTemplate: (topic) =>
`Ada satu hal yang sering terlupakan dari percakapan soal ${topic}:

Ini bukan tentang menjadi sempurna. Ini tentang menjadi lebih baik dari kemarin — sedikit saja.

Hari-hari di mana kamu tidak merasa siap, tidak merasa cukup termotivasi, atau tidak tahu harus mulai dari mana — hari-hari itulah yang paling menentukan.

Karena bertahan di tengah ketidakpastian adalah bentuk komitmen yang paling jujur.

Semoga video ini menemanimu di hari yang kamu butuhkan dorongan.`,
      hashtags: ['#motivasi', '#lifestyle', '#selfimprovement', '#mindset', '#inspirasi'],
    },
  },

  /* ================================================================
     TECH / TUTORIAL
     ================================================================ */
  tech: {

    casual: {
      hooks: [
        "Cara setup {topic} yang gue pakai — lebih simpel dari kebanyakan tutorial yang beredar.",
        "Gue pernah stuck di {topic} yang sama selama tiga hari. Solusinya ternyata ada di satu baris ini.",
        "Kalau kamu belajar {topic} dari tutorial yang panjangnya dua jam, kamu mungkin melewatkan intinya.",
        "Tools {topic} yang gue rekomendasikan bukan yang paling populer — tapi yang paling efektif.",
        "Ini yang gue wish gue tau sebelum mulai belajar {topic} dari awal.",
        "Coba setup {topic} yang satu ini — bisa selesai dalam 10 menit dan kamu tidak perlu balik ke Stack Overflow.",
      ],
      captionTemplate: (topic) =>
`Belajar ${topic} seharusnya tidak butuh waktu sepanjang itu.

Masalah terbesar yang gue temui ketika belajar ${topic} bukan materinya — tapi cara penyampaiannya yang sering melompati hal-hal yang dianggap "sudah dimengerti" padahal tidak.

Di video ini gue tutupi celah itu. Step by step, dengan penjelasan kenapa setiap bagian penting — bukan cuma bagaimana melakukannya.

Kalau kamu stuck di bagian tertentu, tulis di komentar. Gue baca dan jawab yang bisa.`,
      hashtags: ['#coding', '#tech', '#tutorial', '#developer', '#belajarcoding'],
    },

    witty: {
      hooks: [
        "Gue habiskan berjam-jam mencari solusi {topic} yang ternyata ada di dokumentasi halaman pertama.",
        "Tutorial {topic} yang tidak dimulai dengan 'pertama, buka terminal dan install dua puluh dependensi'.",
        "Ada dua jenis developer: yang paham {topic}, dan yang pura-pura paham saat meeting.",
        "Siklus belajar {topic}: excited → confused → Stack Overflow → lebih confused → nemu solusi → lupa besoknya.",
        "Gue jelasin {topic} dengan cara yang harusnya sudah ada dari dulu — tanpa jargon yang tidak perlu.",
        "Kalau dokumentasi {topic} mudah dipahami, video ini tidak perlu ada. Tapi ini tetap perlu ada.",
      ],
      captionTemplate: (topic) =>
`Oke, mari kita akui: dokumentasi ${topic} tidak selalu ramah manusia.

Gue sudah melalui fase di mana satu error di ${topic} bisa menghabiskan satu sore, dan solusinya ada di forum yang dipost tahun 2014 dengan dua upvote.

Video ini adalah versi yang lebih masuk akal dari itu semua. Dengan konteks yang seharusnya ada, penjelasan yang tidak mengasumsikan kamu sudah tahu segalanya, dan sesekali komentar tentang betapa anehnya dunia teknologi ini.

Error apa yang paling sering bikin kamu frustrasi di ${topic}? Komen di bawah.`,
      hashtags: ['#coding', '#developer', '#techhumor', '#tutorial', '#programmer'],
    },

    formal: {
      hooks: [
        "Panduan implementasi {topic} yang mengutamakan kejelasan konsep sebelum masuk ke kode.",
        "Membahas {topic} dari sudut pandang praktis: kapan, mengapa, dan bagaimana menggunakannya dengan tepat.",
        "Best practices dalam {topic} yang berlaku di lingkungan produksi — bukan hanya tutorial.",
        "Tinjauan mendalam tentang {topic}: arsitektur, trade-offs, dan implikasi terhadap maintainability.",
        "Panduan {topic} untuk developer yang ingin membangun pemahaman konseptual yang kuat, bukan sekadar hafal sintaks.",
        "Perbedaan antara menggunakan {topic} dan benar-benar memahami {topic} — dan mengapa itu penting.",
      ],
      captionTemplate: (topic) =>
`Konten ini membahas ${topic} secara komprehensif, dengan penekanan pada pemahaman konseptual yang solid sebelum masuk ke implementasi.

Terlalu banyak developer yang mahir menulis kode ${topic} tanpa benar-benar memahami mengapa kode tersebut bekerja — dan hal ini yang sering menjadi akar dari masalah di kemudian hari.

Materi mencakup: fondasi konseptual, pola implementasi yang umum, trade-offs yang perlu dipertimbangkan, dan kesalahan yang sering terjadi di lingkungan produksi.

Diskusi teknis dan pertanyaan dipersilakan di kolom komentar.

Follow untuk konten software development yang lebih substansial.`,
      hashtags: ['#programming', '#softwaredevelopment', '#tech', '#coding', '#developer'],
    },

    inspirational: {
      hooks: [
        "Setiap developer yang kamu kagumi pernah tidak mengerti {topic} — perbedaannya hanya pada ketekunan.",
        "Satu jam sehari untuk {topic} lebih berdampak dari belajar intensif yang tidak konsisten.",
        "Error bukan tanda kegagalan dalam {topic} — itu tanda bahwa kamu sedang mendorong batas pemahamanmu.",
        "Skill {topic} yang kamu bangun hari ini adalah fondasi dari karir yang kamu bayangkan esok hari.",
        "Bukan soal seberapa cepat kamu paham {topic} — tapi seberapa dalam kamu mau memahaminya.",
        "Setiap developer yang mahir pernah merasa tidak cukup pintar untuk {topic}. Lanjutkan saja.",
      ],
      captionTemplate: (topic) =>
`Satu hal yang ingin saya sampaikan kepada siapa saja yang sedang belajar ${topic}:

Perasaan bahwa kamu tidak cukup pintar untuk ini adalah hal yang hampir semua developer rasakan — termasuk mereka yang sudah bertahun-tahun di bidang ini.

Yang memisahkan mereka yang berhasil bukan kecerdasan bawaan. Tapi kemauan untuk terus kembali ke masalah yang sama sampai ada yang klik.

${topic} itu bisa dikuasai. Prosesnya tidak linear, tapi setiap langkah meninggalkan bekas.

Teruslah belajar.`,
      hashtags: ['#coding', '#developer', '#programminglife', '#motivasi', '#belajarcoding'],
    },
  },

  /* ================================================================
     STORYTELLING
     ================================================================ */
  storytelling: {

    casual: {
      hooks: [
        "Ini cerita soal {topic} yang baru belakangan ini gue sadari punya makna lebih dari yang gue kira.",
        "Gue tidak menyangka pengalaman {topic} ini akan jadi sesuatu yang ingin gue ceritakan.",
        "Ada satu momen soal {topic} yang sampai sekarang masih sering gue pikirkan.",
        "Bukan cerita yang dramatis — tapi soal {topic} yang ternyata mengubah lebih banyak dari yang terlihat.",
        "Gue cerita soal {topic} ini bukan karena sudah punya semua jawabannya — justru sebaliknya.",
        "Kalau kamu pernah mengalami sesuatu soal {topic} yang susah dijelaskan, mungkin kamu bisa relate.",
      ],
      captionTemplate: (topic) =>
`Cerita ini soal ${topic} yang gue simpan cukup lama sebelum akhirnya merasa siap untuk berbagi.

Bukan karena dramatis — tapi karena butuh waktu untuk benar-benar memahami apa yang terjadi dan pelajaran apa yang sebenarnya ada di sana.

Kalau kamu pernah berada di situasi serupa dengan ${topic}, gue harap cerita ini bisa jadi semacam cermin yang berguna.

Tulis pengalamanmu di komentar — gue tertarik untuk mendengar.`,
      hashtags: ['#storytime', '#cerita', '#pengalaman', '#relatable', '#fyp'],
    },

    witty: {
      hooks: [
        "Cerita ini soal {topic} yang pada saat kejadiannya tidak terasa lucu sama sekali. Sekarang, sedikit.",
        "Rating pengalaman {topic} gue: 10/10 untuk nilai pelajarannya, 2/10 untuk kenyamanan saat terjadi.",
        "Gue tidak merekomendasikan cara belajar tentang {topic} seperti yang gue alami — tapi ceritanya menarik.",
        "Ada cerita soal {topic} yang selalu muncul kalau ada yang tanya 'pernah punya pengalaman berkesan?'",
        "Ini adalah cerita tentang {topic} yang harusnya tidak setragis itu, tapi entah kenapa jadi begitu.",
        "Gue sudah cukup jauh dari kejadian {topic} ini untuk bisa menceritakannya tanpa drama berlebihan.",
      ],
      captionTemplate: (topic) =>
`Oke, jadi ceritanya ada insiden soal ${topic} yang waktu itu rasanya cukup menyebalkan.

Tapi dengan jarak waktu yang cukup, ternyata ada banyak hal yang bisa dilihat lebih jernih — termasuk beberapa keputusan yang gue buat yang, kalau dipikir ulang, sangat bisa dimengerti kenapa hasilnya seperti itu.

Gue cerita ini bukan untuk curhat — tapi karena gue rasa ada sesuatu yang berguna di sini, terutama bagi kamu yang mungkin sedang ada di situasi yang mirip.

Kalau kamu punya cerita ${topic} yang serupa, gue penasaran.`,
      hashtags: ['#storytime', '#cerita', '#relatable', '#pengalaman', '#fyp'],
    },

    formal: {
      hooks: [
        "Sebuah refleksi tentang pengalaman dengan {topic} dan apa yang dapat dipelajari darinya.",
        "Menceritakan perjalanan {topic} ini dengan harapan perspektif di dalamnya dapat bermanfaat.",
        "Ada pelajaran dari pengalaman {topic} ini yang baru benar-benar saya pahami belakangan ini.",
        "Setiap pengalaman dengan {topic} menyimpan sesuatu yang layak untuk direnungkan lebih dalam.",
        "Saya berbagi cerita {topic} ini bukan sebagai solusi — tapi sebagai perspektif yang mungkin relevan.",
        "Refleksi jujur tentang {topic}: apa yang berhasil, apa yang tidak, dan apa yang tersisa.",
      ],
      captionTemplate: (topic) =>
`Saya ingin berbagi pengalaman dengan ${topic} yang menurut saya layak untuk didokumentasikan — bukan karena kisahnya luar biasa, tapi karena pelajaran di dalamnya mungkin relevan bagi lebih banyak orang dari yang saya duga.

Proses merefleksikan ${topic} ini membutuhkan waktu. Ada hal-hal yang baru bisa dilihat dengan jernih setelah jarak waktu yang cukup.

Saya berharap perspektif yang saya bagikan di sini dapat memberikan sesuatu yang berguna — entah berupa wawasan baru, atau sekadar rasa bahwa pengalaman serupa bisa dihadapi dan dilewati.

Tanggapan dan pengalaman Anda sendiri sangat saya nantikan di kolom komentar.`,
      hashtags: ['#cerita', '#refleksi', '#storytelling', '#pengalaman', '#perspektif'],
    },

    inspirational: {
      hooks: [
        "Pengalaman {topic} ini mengajarkan gue satu hal yang tidak akan ditemukan di buku manapun.",
        "Gue hampir tidak melewati bagian tersulit dari {topic} ini — tapi ternyata justru di situlah semuanya berubah.",
        "Perjalanan dengan {topic} tidak pernah terasa seperti yang gue bayangkan. Dan gue bersyukur untuk itu.",
        "Ada momen dalam {topic} yang membuat gue mempertanyakan segalanya. Dan itu adalah titik balik terbaik.",
        "Dari pengalaman {topic} ini, gue belajar bahwa kekuatan bukan tentang tidak pernah goyah.",
        "Cerita ini tentang {topic} — tapi lebih dalam dari itu, tentang memilih untuk terus maju.",
      ],
      captionTemplate: (topic) =>
`Pengalaman dengan ${topic} ini adalah salah satu yang paling membentuk cara saya melihat banyak hal.

Bukan karena berjalan mulus — justru sebaliknya. Ada bagian-bagian yang berat, membingungkan, dan menguji hal-hal yang saya pikir sudah yakin.

Tapi dari titik itu, ada sesuatu yang bergeser. Bukan secara dramatis — lebih seperti pemahaman yang perlahan-lahan menjadi lebih jernih.

Saya berbagi ini karena saya percaya setiap orang yang sedang dalam proses serupa perlu mendengar bahwa yang mereka alami itu valid. Dan bahwa prosesnya, sekalipun tidak nyaman, sedang membentuk sesuatu yang berharga.

Semoga cerita ini menemanimu di saat yang tepat.`,
      hashtags: ['#cerita', '#inspirasi', '#perjalanan', '#storytelling', '#motivasi'],
    },
  },
};

/* ============================================================
   3. HISTORY — localStorage, max 5 entri
   ============================================================ */

const HISTORY_KEY   = 'tcb_history_v3';
const HISTORY_LIMIT = 5;

/** Membaca array riwayat dari localStorage. */
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

/** Menyimpan array riwayat ke localStorage. */
function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

/**
 * Menambah entri baru ke riwayat (prepend, max HISTORY_LIMIT).
 * @param {string} topic
 * @param {string} niche
 * @param {string} tone
 */
function addHistoryEntry(topic, niche, tone) {
  const history = loadHistory();
  const entry = {
    id: Date.now(),
    topic,
    niche,
    tone,
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
  };
  history.unshift(entry);
  if (history.length > HISTORY_LIMIT) history.length = HISTORY_LIMIT;
  saveHistory(history);
  return entry;
}

/** Menghapus seluruh riwayat dari localStorage. */
function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

/* ============================================================
   4. RENDER HISTORY UI
   ============================================================ */

/**
 * Me-render ulang seluruh panel riwayat dari localStorage.
 * Dipanggil saat init dan setiap setelah perubahan data.
 */
function renderHistory() {
  const list    = document.getElementById('history-list');
  const empty   = document.getElementById('history-empty');
  const history = loadHistory();

  list.innerHTML = '';

  if (history.length === 0) {
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  history.forEach((entry) => {
    const li = buildHistoryItem(entry);
    list.appendChild(li);
  });
}

/**
 * Prepend satu item riwayat baru ke daftar tanpa re-render total.
 * Hapus item ke-(HISTORY_LIMIT+1) jika ada.
 * @param {object} entry
 */
function prependHistoryItem(entry) {
  const list  = document.getElementById('history-list');
  const empty = document.getElementById('history-empty');

  empty.style.display = 'none';

  const li = buildHistoryItem(entry);
  list.insertBefore(li, list.firstChild);

  while (list.children.length > HISTORY_LIMIT) {
    list.removeChild(list.lastChild);
  }
}

/**
 * Membuat elemen <li> untuk item riwayat.
 * @param {object} entry
 * @returns {HTMLLIElement}
 */
function buildHistoryItem(entry) {
  const li = document.createElement('li');
  li.className = 'history-item';
  li.setAttribute('role', 'button');
  li.setAttribute('tabindex', '0');
  li.setAttribute('aria-label', `Muat ulang: ${entry.topic}`);

  li.innerHTML = `
    <div class="history-item-topic">${escapeHtml(entry.topic)}</div>
    <div class="history-item-meta">
      <span class="badge badge-niche">${NICHE_LABELS[entry.niche] || entry.niche}</span>
      <span class="badge badge-tone">${TONE_LABELS[entry.tone] || entry.tone}</span>
    </div>
    <div class="history-item-time">${entry.time}</div>
  `;

  const loadEntry = () => restoreFromHistory(entry);
  li.addEventListener('click', loadEntry);
  li.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') loadEntry();
  });

  return li;
}

/* ============================================================
   5. HELPER FUNCTIONS
   ============================================================ */

/** Pilih N item unik secara acak dari array. */
function pickUniqueN(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

/** Ganti semua {topic} placeholder dengan teks aktual. */
function fillTemplate(template, topic) {
  return template.replace(/\{topic\}/g, topic);
}

/** Escape karakter HTML untuk mencegah XSS pada innerHTML. */
function escapeHtml(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

/* ============================================================
   6. RENDER OUTPUT FUNCTIONS
   ============================================================ */

/** Render 3 hook ke #hook-content. */
function renderHooks(hooks) {
  const container = document.getElementById('hook-content');
  const ul = document.createElement('ul');
  ul.className = 'hook-list';

  hooks.forEach((hookText, index) => {
    const li = document.createElement('li');
    li.className = 'hook-item';

    const numSpan = document.createElement('span');
    numSpan.className = 'hook-number';
    numSpan.textContent = `${index + 1}.`;

    const textSpan = document.createElement('span');
    textSpan.textContent = hookText;

    li.appendChild(numSpan);
    li.appendChild(textSpan);
    ul.appendChild(li);
  });

  container.innerHTML = '';
  container.appendChild(ul);
}

/** Render caption + hashtag chips ke #caption-content. */
function renderCaption(captionText, hashtags) {
  const container = document.getElementById('caption-content');

  const captionBlock = document.createElement('div');
  captionBlock.className = 'caption-block';
  captionBlock.textContent = captionText;

  const hashtagRow = document.createElement('div');
  hashtagRow.className = 'caption-hashtags';
  hashtags.forEach((tag) => {
    const chip = document.createElement('span');
    chip.className = 'hashtag-chip';
    chip.textContent = tag;
    hashtagRow.appendChild(chip);
  });

  container.innerHTML = '';
  container.appendChild(captionBlock);
  container.appendChild(hashtagRow);
}

/* ============================================================
   7. COPY TO CLIPBOARD
   ============================================================ */

/**
 * Salin teks dari elemen target ke clipboard.
 * Tombol berubah jadi "✓ Copied!" selama 2 detik.
 */
function copyContent(targetId, btn) {
  const targetEl = document.getElementById(targetId);
  if (!targetEl) return;

  const textToCopy = targetEl.innerText || targetEl.textContent;

  navigator.clipboard.writeText(textToCopy).then(() => {
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
      btn.disabled = false;
    }, 2000);
  }).catch(() => {
    btn.textContent = 'Error!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  });
}

/* ============================================================
   8. FORM VALIDATION FEEDBACK
   ============================================================ */

function showInputError() {
  const topicInput = document.getElementById('topic-input');
  topicInput.focus();
  topicInput.style.borderColor = 'var(--accent-pink)';
  topicInput.style.boxShadow   = '0 0 0 3px rgba(254,44,85,0.30)';
  const originalPlaceholder    = topicInput.placeholder;
  topicInput.placeholder       = '⚠️  Isi topik dulu ya...';
  setTimeout(() => {
    topicInput.style.borderColor = '';
    topicInput.style.boxShadow   = '';
    topicInput.placeholder       = originalPlaceholder;
  }, 2000);
}

/* ============================================================
   9. GENERATE — Fungsi utama
   ============================================================ */

function handleGenerate() {
  const topicInput    = document.getElementById('topic-input');
  const nicheSelect   = document.getElementById('niche-select');
  const toneSelect    = document.getElementById('tone-select');
  const outputSection = document.getElementById('output-section');

  const topic = topicInput.value.trim();
  const niche = nicheSelect.value;
  const tone  = toneSelect.value;

  if (!topic) { showInputError(); return; }

  const template    = TEMPLATES[niche][tone];
  const filledHooks = pickUniqueN(template.hooks, 3).map((h) => fillTemplate(h, topic));
  const captionText = template.captionTemplate(topic);

  renderHooks(filledHooks);
  renderCaption(captionText, template.hashtags);

  outputSection.classList.remove('hidden');
  outputSection.style.animation = 'none';
  void outputSection.offsetHeight;
  outputSection.style.animation = '';

  const entry = addHistoryEntry(topic, niche, tone);
  prependHistoryItem(entry);

  if (window.innerWidth <= 900) {
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ============================================================
   10. RESET FORM
   ============================================================ */

function handleReset() {
  const topicInput    = document.getElementById('topic-input');
  const nicheSelect   = document.getElementById('niche-select');
  const toneSelect    = document.getElementById('tone-select');
  const outputSection = document.getElementById('output-section');

  topicInput.value  = '';
  nicheSelect.value = 'edukasi';
  toneSelect.value  = 'casual';

  outputSection.style.opacity    = '0';
  outputSection.style.transform  = 'translateY(-8px)';
  outputSection.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

  setTimeout(() => {
    outputSection.classList.add('hidden');
    outputSection.style.opacity    = '';
    outputSection.style.transform  = '';
    outputSection.style.transition = '';
  }, 260);

  topicInput.focus();
}

/* ============================================================
   11. RESTORE FROM HISTORY
   ============================================================ */

function restoreFromHistory(entry) {
  const topicInput  = document.getElementById('topic-input');
  const nicheSelect = document.getElementById('niche-select');
  const toneSelect  = document.getElementById('tone-select');

  topicInput.value  = entry.topic;
  nicheSelect.value = entry.niche;
  toneSelect.value  = entry.tone;

  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

  topicInput.style.borderColor = 'var(--accent-cyan)';
  topicInput.style.boxShadow   = '0 0 0 3px rgba(37,244,238,0.20)';
  setTimeout(() => {
    topicInput.style.borderColor = '';
    topicInput.style.boxShadow   = '';
  }, 1500);
}

/* ============================================================
   12. CLEAR HISTORY
   ============================================================ */

function handleClearHistory() {
  clearHistory();
  document.getElementById('history-list').innerHTML  = '';
  document.getElementById('history-empty').style.display = 'block';
}

/* ============================================================
   13. EVENT LISTENERS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('generate-btn').addEventListener('click', handleGenerate);

  document.getElementById('topic-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleGenerate();
  });

  document.getElementById('reset-btn').addEventListener('click', handleReset);

  const copyHookBtn = document.getElementById('copy-hook-btn');
  copyHookBtn.addEventListener('click', () => copyContent('hook-content', copyHookBtn));

  const copyCaptionBtn = document.getElementById('copy-caption-btn');
  copyCaptionBtn.addEventListener('click', () => copyContent('caption-content', copyCaptionBtn));

  document.getElementById('clear-history-btn').addEventListener('click', handleClearHistory);

  renderHistory();

});
