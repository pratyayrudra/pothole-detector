# Pothole Detector

## About the Project

Road networks are the means of transporting, sharing and movement of goods and services from place to place in society. Road networks are also channels of communication in some parts of the world. Consequently, access to good road networks enhances the quality of life and work of people living in society. But the poor nature of design and development of road networks coupled with natural disasters such as heavy rainfall has brought about many unwanted potholes and scratches on the roads which are very dangerous to commuters and other road users as well as vehicles that utilize the roads. In addition, the lack of a proper road maintenance system has resulted in an ever increasing number of potholes which endanger efficient transportation and road safety. Or they depend on complaints raised by citizens about any particular piece of road. This involves a lot of manpower for inspection and locating the defects, also a lot of time is wasted in the process. Our goal is to implement machine learning and create a model that will detect the potholes and road cracks. Also the location of these will be easily accessible later on for fixing. This is the basic concept of the entire solution.

## Working of the System

The entire workflow of the process is detailed below:

- So we will be using deep learning, to develop a model that will identify potholes and road cracks. The model will be trained on hundreds of positive images of potholes and road cracks to improve the accuracy.
- Then we will be using this model to identify/detect potholes and road cracks from real-world images/video feeds. These images/video feeds can be obtained in two ways.
  - Citizens can submit/upload the images of roads through an APP. Along with the image the location will also be obtained through the APP. Later on the images will be used for image processing.
  - Road department officials can mount a camera (like GoPro) on a car and travel throughout the city covering all roads. Later on the footage from the camera will be used for image processing.
- Then we will categories the potholes based on the condition using a mathematical model.
- Then we will store the potholes image and mark the location of it on a map and also store it in a database. So this can be accessed from an APP later on by the construction workers.
- Finally, construction workers can fix more potholes easily by locating them through the APP in minimum time.

## Technology Used

- **Software:**

  1.  **Dataset**: We gathered a dataset of about 50,000 pothole images.
  2.  **TensorFlow**: We created a custom CNN model using Keras and then trained the model on the dataset.
  3.  **Angular**: We used Angular to create a Front-end application. Using which the user can upload pothole images and even go through all previous data on a Map.
  4.  **Python**: We used flask to create an API to serve the model. This backend was responsible for the database and other logics.

- **Hardware:**

  1.  We used **Google Colab** to train the ML model.
  2.  We used an **AWS ec2 server** to host our application backend.
  3.  We used **Netlify** to host our Front-end application.

## Contributors

- Pratyay Rudra
- Raya Paul
- Sheikh Tabish
- Dishani Kar
