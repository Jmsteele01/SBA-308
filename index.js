
    // Output: 
    // Student ID
    // average grade
    // list of assignments (submission score / max points)

//listing today's date
const currentDate = "2025-02-01"



const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  function dateConversion(date)
  {
    if(typeof date == "string")
      {
        return ""+date.slice(0,4)+date.slice(5,7)+date.slice(8,11);
      }
    else
    {    
      return null;
    }
  }

  function GetLetterGrade(myGrade)
  {
    let s = "";
    switch(true)
    {
      case (myGrade>=90):
        s = "A"
        break;
      case (myGrade>=80):
        s = "B"
        break;
        case (myGrade>=70):
          s = "C"
          break;
        case (myGrade>=60):
          s = "D"
          break;
        default:
          s = "F"
    };
    return s;
  }

  function getGrade(ag, id, submissions)
  {
    //getting the total possible points
    gradeBreakdown = {
      student_id: id,
      percent: 0,
      letter_grade: "?",
      assignment_scores: []
      }
      
       let possPoints = 0;

      for(let x = 0; x < ag.assignments.length; x++)
      {
        if(dateConversion(ag.assignments[x].due_at) <= dateConversion(currentDate))
        {
          possPoints += ag.assignments[x].points_possible;
        }
      }

      //getting student score
      let myPoints = 0; 
      let currentScore = 0;
      for(let x=0; x < submissions.length && x < ag.assignments.length; x++)
      {
          if(dateConversion(ag.assignments[x].due_at) <= dateConversion(currentDate) && submissions[x].learner_id == id)
            {
              currentScore = Number(submissions[x].submission.score);
              if(dateConversion(ag.assignments[x].due_at) > dateConversion(submissions[x].submission.submitted_at))
              {
                currentScore -= 10;
              }
              gradeBreakdown.assignment_scores.push(currentScore);
              myPoints += currentScore;
              currentScore = 0;
            }
      }
      gradeBreakdown.percent = (myPoints/possPoints)*100;
      gradeBreakdown.letter_grade = GetLetterGrade(gradeBreakdown.percent);
      return gradeBreakdown;

  }
      
  
  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    let myID = submissions[0].learner_id;
    studentIDs = [];

    for(let x=0; x < submissions.length; x++)
    {
      if(studentIDs.find(submissions[x].learner_id) != true)
      {
        studentIDs.push(submissions[x].learner_id);
      }
    }
    foreach => studentIDs{
    let myGrade = getGrade(ag, studentIDs, submissions);

    console.log("Student ID: "+myGrade.student_id);
    console.log(course.name+" grades");
    console.log(myGrade.percent);
    console.log(myGrade.letter_grade);
    }


    let myAssignments = [];

    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  