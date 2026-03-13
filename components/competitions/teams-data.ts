const teamsData = {
    "dev-design": [
        { name: "Design Arena by WebApp Fusion", "teamMembers": "Wareesha Faheem ● Saahil Ghulam Mohammad" },
        { name: "Hackathon", "teamMembers": "Muhammad Anas ● Abdul Rafay Tariq" },
        { name: "Stack Breach", "teamMembers": "Syed Khizer Raza ● Muhammad Omer ● Umer Abbasi" }
    ],

    "software-eng": [
        { name: "SQL Showdown", "teamMembers": "M ● Ali Bhutto ● Asad Ur Rehman ● Yash Lal" },
        { name: "API Blitz", "teamMembers": "Ali Ahmed Malick ● Rameen Jamal ● Danish Ahmed" },
        { name: "SysCore", "teamMembers": "Ayan Hussain ● M ● Hanzala Jamil ● Zafeer Mahmood" },
        { name: "Class Wars", "teamMembers": "Taha Anwar ● Mashal Zahra ● Rumesa Iqbal" }
    ],

    "coding": [
        { name: "Competitive Programming", "teamMembers": "Ali Hadi ● Mohid Raheel Khan ● Hani Ali" },
        { name: "Code Sprint", "teamMembers": "Valihasan ● Raza" },
        { name: "Debug Relay", "teamMembers": "Maaz ● Hur Ali ● Taha Jaffri" }
    ],

    "ai-data": [
        { name: "AI Got Talent", "teamMembers": "Muhammad Ali Mustafa ● Syeda Fizza ● Zehra Waqar" },
        { name: "Today We are Vibe Coding", "teamMembers": "Muhammed Owais ● Syed Fahad Faheem Shah ● Muhammad Ali" },
        { name: "Guilty By Data", "teamMembers": "Muhammad Awais ● Abdul Rafay ● Usaid Sajid" },
        { name: "Prompt Prognosis", "teamMembers": "Laiba Binte Zia ● Muhammad Abser Mansoor ● Amna" }
    ],

    "tech-quest": [
        { name: "Recursion Hell: Find the Exit", "teamMembers": "Syed Shaheer Hasan ● Muhammad Ahsan ● Ali Hussain" },
        { name: "Digital Scavenger Hunt", "teamMembers": "Muhammad Muzammil ● Muhammad Adil Saeed ● Osailah Atif" }
    ],

    "electrical-eng": [
        { name: "Circuit Design", "teamMembers": "Syed Bilal Gilani ● Mariyam Iftikhar" },
        { name: "LFR", "teamMembers": "Ali Khan ● Teesha Kumari" },
        { name: "Robo Sumo", "teamMembers": "Ahmed Raza ● Zain Yaqoob" },
        { name: "Robo Soccer", "teamMembers": "Hasan Ahmed Khan ● Ziyan Shabir" }
    ],

    "business": [
        { name: "FinFusion", "teamMembers": "Muhammad Umer ● Hiba Niaz ● Waqar Nadeem" },
        { name: "Synapse X", "teamMembers": "Mariam Atif ● Anchal Vikram ● Emaan Tariq" },
        { name: "Dolphin's Tank", "teamMembers": "Saud ● Kainat Gul ● Ali Hirani" }
    ],

    "general": [
        { name: "TDM", "teamMembers": "Duaa Siraj ● Wassaf ● Zulfiqar" },
        { name: "Scavenger Hunt", "teamMembers": "Shehryar Rafiq ●  Amber ● Ibrahim ● Muhammad Taha Ahmed Siddiqui" },
        { name: "CSI", "teamMembers": "Shahzaib Raza ● Saad ● Roshni ● Osailah Atif" },
        { name: "Trump", "teamMembers": "Myer Kamran ● Waleed" },
        { name: "Rage Room", "teamMembers": "Asra Fadoo ● Syed Aazmir Hussain" },
        { name: "Karaoke", "teamMembers": "Asra Fadoo ● Ayra Omar" },
        { name: "Chess", "teamMembers": "Musbah Rashid ● Aouf" }
    ]
};


const categoryData = {
    business: [
        { role: "Director", name: "Huzaifa Qadri", studentId: "23K-5514", initials: "HQ", linkedin: "https://www.linkedin.com/in/huzaifa-qadri-77180b294/" },
        { role: "Assistant Director", name: "Amna Saeed", studentId: "23K-5547", initials: "AS", linkedin: "https://www.linkedin.com/in/amna-saeed-7a1504295/" },
        { role: "Assistant Director", name: "Abdul Rafay", studentId: "23K-5525", initials: "AR", linkedin: "https://www.linkedin.com/in/rafay-mughal-54a86a289/" }
    ],

    "electrical-eng": [
        { role: "Director", name: "Affan Ahmed", studentId: "23K-6057", initials: "AA", linkedin: "www.linkedin.com/in/affan-ahmed-15060a21a/" },
        { role: "Assistant Director", name: "Eshaal Ali", studentId: "23K-6075", initials: "EA", linkedin: "" },
        { role: "Assistant Director", name: "Abdullah Ahmed", studentId: "23K-6072", initials: "AA", linkedin: "www.linkedin.com/in/syed-abdullah-ahmed-403016330/" },
        { role: "Assistant Director", name: "Mirza Shehzor Ali", studentId: "23K-6073", initials: "MSA", linkedin: "" },
        { role: "Assistant Director", name: "Mohammad Adan", studentId: "23K-6107", initials: "MA", linkedin: "www.linkedin.com/in/mohammad-adan-410b59291/" },
        { role: "Assistant Director", name: "Muhammad Hasnain Memon", studentId: "24K-2001", initials: "MHM", linkedin: "www.linkedin.com/in/muhammad-hasnain-memon-8215701b8/" }
    ],

    "general": [
        { role: "Director", name: "Laiba Ashfaq Adamji", studentId: "24K-0840", initials: "LAA", linkedin: "https://www.linkedin.com/in/laiba-adamji-b88584193/" },
        { role: "Assistant Director", name: "Duaa Siraj", studentId: "24K-0524", initials: "DS", linkedin: "https://www.linkedin.com/in/duaa-siraj-68b6261b4/" },
        { role: "Assistant Director", name: "Shehryar Rafiq", studentId: "24K-0569", initials: "SR", linkedin: "https://www.linkedin.com/in/shehryar-rafiq-858903253/" },
        { role: "Assistant Director", name: "Asra Fadoo", studentId: "24K-0667", initials: "AF", linkedin: "https://www.linkedin.com/in/asra-fadoo-373461298/" }
    ],
    "coding": [
        { role: "Category Head", name: "M. Taaha", studentId: "23K-0548", initials: "MT", linkedin: "https://www.linkedin.com/in/muhammad-taahaatfast/" },
        { role: "Co-Head", name: "Muhammad Raahim", studentId: "23K-0729", initials: "MR", linkedin: "https://www.linkedin.com/in/muhammad-raahim-munawwar-90a259263/" }
    ],

    "software-eng": [
        { role: "Category Head", name: "Zohair Shamsi", studentId: "23K-0558", initials: "ZS", linkedin: "https://www.linkedin.com/in/zohairshamsi/" },
        { role: "Co-Head", name: "Umer Khan", studentId: "23K-0798", initials: "UK", linkedin: "https://www.linkedin.com/in/umer-khan10/" }
    ],

    "dev-design": [
        { role: "Category Head", name: "Hamza Ahmed", studentId: "22K-4825", initials: "HA", linkedin: "https://www.linkedin.com/in/hamza-ahmed-75a656254" },
        { role: "Co-Head", name: "Syed Haider Murtaza", studentId: "23K-0666", initials: "SHM", linkedin: "https://www.linkedin.com/in/haidercs" }
    ],

    "tech-quest": [
        { role: "Category Head", name: "Sana Munir", studentId: "24K-0573", initials: "SM", linkedin: "https://www.linkedin.com/in/sana-munir-alam-129945323/" },
        { role: "Co-Head", name: "Adeena Asif", studentId: "24K-0628", initials: "AA", linkedin: "https://www.linkedin.com/in/adeena-asif-837a08345/" }
    ],

    "ai-data": [
        { role: "Category Head", name: "Falah Zainab", studentId: "22K-4491", initials: "FZ", linkedin: "https://www.linkedin.com/in/falah-zainab-9b7ab8344/" },
        { role: "Co-Head", name: "Mudasir", studentId: "22K-8732", initials: "M", linkedin: "https://www.linkedin.com/in/mudasir-naeem-698679303/" }
    ]
};

export { categoryData, teamsData };