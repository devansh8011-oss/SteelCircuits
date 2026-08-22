export const PORTFOLIO_DATA = {
  personal: {
    name: "Devansh Grover",
    titleTag: "AI · IOT · ROBOTICS",
    brandName: "SteelCircuits",
    aboutTitle: "Autonomous Robotics & Embedded Hardware",
    aboutBio: "Robotics enthusiast with 5+ years of hands-on experience building autonomous machines. I combine electronics, embedded systems, AI, and computer vision to bring ideas to life. I also create automation workflows using n8n. This showcase reflects my passion for robotics, innovation, and making things move.",
    email: "devansh8011@gmail.com",
    phone: "7303177088",
    github: "https://github.com/devansh8011-oss",
    instagram: "https://instagram.com/devansh999ai",
    hfSpaceUrl: "https://devansh8011-ai-chatbot.hf.space/chat",
  },

  rotatingDisciplines: [
    "Robotics",
    "Electronics",
    "AI",
    "IoT Hardware"
  ],

  stats: [
    { label: "YEARS EXP", value: "5+" },
    { label: "PROJECTS", value: "20+" },
    { label: "CERTIFICATIONS", value: "5+" }
  ],

  aboutTags: [
    "#ROS & Kinematics",
    "#Embedded Systems",
    "#Computer Vision",
    "#n8n Automation",
    "#Laser Cutting"
  ],

  playgroundChips: [
    "+ Eye-Controlled Car Demo",
    "+ Paperclip AI Workflows",
    "+ Laser Cutting Fabrication",
    "+ n8n Automation Workflows"
  ],

  chatSuggestions: [
    "⚡ What projects have you built?",
    "🤖 How does the eye-controlled car work?",
    "🔧 What hardware do you use?",
    "✂️ Do you use laser cutting?",
    "🔗 What is Paperclip AI?"
  ],

  projectCategories: ["ALL", "ROBOTICS", "AI", "HARDWARE"],

  projects: [
    {
      id: "nexus-delivery-bot",
      title: "NEXUS Delivery Robot — Prototype 1",
      category: "ROBOTICS",
      desc: "Smart delivery robot with a custom control UI, LiDAR obstacle detection, and ultrasonic anti-theft.",
      youtubeId: "kHH7z3wC6GI",
      overview: "NEXUS Delivery Robot Prototype 1 is a smart delivery robot controlled through a custom-designed user interface. The user simply enters the distance the robot needs to travel and presses Execute, after which the robot automatically moves according to the given instructions. It also includes object detection and an anti-theft system for protecting delivered packages.",
      working: "The ESP32 acts as the main microcontroller and controls the robot's movement. A VL53L0X time-of-flight LiDAR sensor detects objects and obstacles in front of the robot, while 300 RPM Johnson motors with 125 mm wheels handle movement. An ultrasonic sensor works as an anti-theft system — it monitors the delivery area and can trigger an alert if someone attempts to take the package. The complete system is powered by an 11.1 V LiPo battery, with regulated power supplied to the electronics.",
      components: [
        "ESP32",
        "VL53L0X LiDAR",
        "Ultrasonic Sensor",
        "BTS7960 Motor Driver",
        "300 RPM Johnson Motors",
        "125 mm Wheels",
        "11.1 V LiPo Battery",
        "Custom Control UI"
      ]
    },
    {
      id: "robo-race-bot",
      title: "RoboRace Bot",
      category: "ROBOTICS",
      desc: "High-speed manually controlled race bot built for the Teknoxian robotics competition.",
      youtubeId: "bl2gWOpC4_4",
      overview: "The RoboRace Bot is a high-speed manually controlled robot built for the Teknoxian robotics competition. It was designed to handle a challenging race course while maintaining good speed, stability, and control.",
      working: "An Arduino Uno acts as the main controller. Two BTS7960 motor drivers independently control the robot's motors, while four 300 RPM Johnson motors provide the required speed and torque. The robot uses a FlySky FS-CT6B transmitter and receiver system for wireless manual control. Its 125 mm wheels provide good ground clearance and help the robot handle obstacles, while the metal chassis provides strength and durability during the race.",
      components: [
        "Arduino Uno",
        "2x BTS7960 Motor Drivers",
        "FlySky FS-CT6B",
        "Metal Chassis",
        "4x 300 RPM Johnson Motors",
        "125 mm Wheels"
      ]
    },
    {
      id: "rfid-attendance",
      title: "RFID Attendance System",
      category: "HARDWARE",
      desc: "Contactless attendance — tap an RFID card and get marked present, with LED confirmation.",
      youtubeId: "uIu3_PnATQU",
      overview: "The RFID Attendance System is a simple contactless system designed to automatically mark a person's attendance using an RFID card.",
      working: "An Arduino Uno communicates with the RFID module to detect an RFID card. When a card is tapped, the system recognizes the card and marks the person as present, and an LED provides a visual indication that the card has been detected successfully. The circuit is built on a breadboard and operates using a regulated 5 V power supply, making it a simple and efficient solution for contactless attendance.",
      components: [
        "Arduino Uno",
        "RFID Module",
        "RFID Card",
        "LED",
        "Breadboard",
        "5 V Power Supply"
      ]
    },
    {
      id: "maze-rescue-robot",
      title: "Autonomous Maze Solver",
      category: "ROBOTICS",
      desc: "Competition robot that autonomously navigates and explores a maze, reacting to tile colors.",
      youtubeId: "1ZXrR4PRBOg",
      overview: "The Autonomous Maze Solver is a competition-focused robot designed to independently navigate and explore a maze. Its main objective is to solve the complete maze while exploring as much of the available path as possible.",
      working: "The robot uses sensors to detect the tiles and surroundings while navigating through the maze. When it encounters a black tile, it completely avoids the tile and activates a buzzer as an alert. When it detects a blue tile, it activates a blue LED to indicate the detection. The robot makes navigation decisions autonomously using its programmed logic, allowing it to explore the maze without manual control.",
      components: [
        "Microcontroller",
        "Maze Detection Sensors",
        "Motors",
        "Motor Driver",
        "Buzzer",
        "Blue LED",
        "Robot Chassis"
      ]
    },
    {
      id: "eye-controlled-car",
      title: "Eye-Controlled Car",
      category: "AI",
      desc: "Computer-vision car controlled by the driver's eye state using OpenCV + MediaPipe.",
      youtubeId: "LPo3su2wmzA",
      overview: "The Eye-Controlled Car is an innovation project that uses computer vision to control a robotic vehicle based on the driver's eye state. It demonstrates how OpenCV, MediaPipe, and robotics can work together to create an intelligent control system.",
      working: "A laptop uses a camera along with OpenCV and MediaPipe to detect the driver's eyes. When the eyes are detected as open, the laptop wirelessly sends a command to the ESP32, causing the car to move forward. When the eyes are detected as closed, the ESP32 immediately stops the motors and activates a buzzer as an alert. The system continuously monitors the driver's eyes and repeats this process in real time.",
      components: [
        "ESP32",
        "2x BO Motors",
        "L298N Motor Driver",
        "Laptop",
        "Camera",
        "OpenCV",
        "MediaPipe",
        "Buzzer"
      ]
    }
  ],

  certifications: [
    {
      title: "Claude AI Workshop, IIT Delhi",
      issuer: "IIT Delhi"
    },
    {
      title: "Advanced Workshop on IoT & Robotics",
      issuer: "Embedded Systems Academy"
    },
    {
      title: "Indian Academy of Robotics Graduation",
      issuer: "Indian Academy of Robotics"
    },
    {
      title: "CreAct Academy Graduation",
      issuer: "FullStack Institute"
    },
    {
      title: "Technoxion Participation Certificate",
      issuer: "Technoxion Global Robotics Championship"
    }
  ],

  achievements: [
    {
      title: "Projects published on official Arduino Project Hub",
      linkLabel: "Click to view here",
      url: "https://projecthub.arduino.cc/devansh999"
    }
  ]
};
