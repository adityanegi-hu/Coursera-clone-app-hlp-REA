import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCatalog from './components/CourseCatalog';
import CourseDetailModal from './components/CourseDetailModal';
import ClassroomPlayer from './components/ClassroomPlayer';
import AssessmentModal from './components/AssessmentModal';
import CourseraCoach from './components/CourseraCoach';
import CertificateModal from './components/CertificateModal';
import MyLearningDashboard from './components/MyLearningDashboard';
import { COURSES_DATA, INITIAL_USER_STATE } from './data/coursesData';

export default function App() {
  const [courses] = useState(COURSES_DATA);
  const [currentView, setCurrentView] = useState('catalog'); // 'catalog' | 'course-detail' | 'classroom' | 'my-learning'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [activeQuizItem, setActiveQuizItem] = useState(null);
  const [activeCertCourse, setActiveCertCourse] = useState(null);

  // User persistent state
  const [userState, setUserState] = useState(() => {
    const saved = localStorage.getItem('coursera_user_state');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
  });

  const saveUserState = (newState) => {
    setUserState(newState);
    localStorage.setItem('coursera_user_state', JSON.stringify(newState));
  };

  const handleEnrollCourse = (courseId) => {
    if (!userState.enrolledCourseIds.includes(courseId)) {
      const updated = {
        ...userState,
        enrolledCourseIds: [...userState.enrolledCourseIds, courseId]
      };
      saveUserState(updated);
    }
  };

  const handleCompleteItem = (itemId) => {
    if (!userState.completedItemIds.includes(itemId)) {
      const updated = {
        ...userState,
        completedItemIds: [...userState.completedItemIds, itemId],
        completedGoalHours: Math.min(
          userState.weeklyGoalHours,
          +(userState.completedGoalHours + 0.3).toFixed(1)
        )
      };
      saveUserState(updated);
    }
  };

  const handlePassQuiz = (itemId, score) => {
    const updated = {
      ...userState,
      completedItemIds: Array.from(new Set([...userState.completedItemIds, itemId])),
      quizScores: {
        ...userState.quizScores,
        [itemId]: score
      }
    };
    saveUserState(updated);
  };

  const handleOpenCert = (courseId) => {
    const found = courses.find((c) => c.id === courseId) || courses[0];
    setActiveCertCourse(found);
  };

  return (
    <div className="cds-app">
      {/* Global Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentView={currentView}
        setCurrentView={setCurrentView}
        userState={userState}
        onOpenCert={handleOpenCert}
      />

      {/* Main Views */}
      {currentView === 'catalog' && (
        <main>
          <Hero
            userState={userState}
            onStartLearning={() => {
              setSelectedCourse(courses[0]);
              setCurrentView('classroom');
            }}
          />
          <CourseCatalog
            courses={courses}
            searchTerm={searchTerm}
            userState={userState}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setCurrentView('course-detail');
            }}
          />
        </main>
      )}

      {currentView === 'course-detail' && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setCurrentView('catalog')}
          isEnrolled={userState.enrolledCourseIds.includes(selectedCourse?.id)}
          onEnroll={handleEnrollCourse}
          onGoToClassroom={(course) => {
            setSelectedCourse(course);
            setCurrentView('classroom');
          }}
        />
      )}

      {currentView === 'classroom' && selectedCourse && (
        <ClassroomPlayer
          course={selectedCourse}
          onBack={() => setCurrentView('course-detail')}
          userState={userState}
          onCompleteItem={handleCompleteItem}
          onOpenQuiz={(quizItem) => setActiveQuizItem(quizItem)}
          onOpenCoach={(topic) => {}}
          onOpenCert={handleOpenCert}
        />
      )}

      {currentView === 'my-learning' && (
        <MyLearningDashboard
          courses={courses}
          userState={userState}
          onGoToClassroom={(course) => {
            setSelectedCourse(course);
            setCurrentView('classroom');
          }}
          onOpenCert={handleOpenCert}
        />
      )}

      {/* Assessment / Practice Quiz Modal */}
      {activeQuizItem && (
        <AssessmentModal
          quizItem={activeQuizItem}
          onClose={() => setActiveQuizItem(null)}
          onPassQuiz={handlePassQuiz}
        />
      )}

      {/* Certificate of Completion Modal */}
      {activeCertCourse && (
        <CertificateModal
          course={activeCertCourse}
          userState={userState}
          onClose={() => setActiveCertCourse(null)}
        />
      )}

      {/* Coursera AI Coach Widget */}
      <CourseraCoach contextTitle={selectedCourse?.title} />
    </div>
  );
}
