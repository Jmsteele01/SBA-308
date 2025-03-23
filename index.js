
    // Output: 
    // Student ID
    // average grade
    // list of assignments (submission score / max points)

//listing today's date
const currentDate = "2023-02-01"

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

function sum(x, y){ return x + y};

  function getPointTotal(log, id)
  {
    let points = 0;
    if( log == AssignmentGroup.assignments)
    {
        log.forEach(log => points += log.points_possible);
        return points;
    }
    else if(log == LearnerSubmissions)
    {
        for(x=0; x < log.length; x++)
        {
            if(id == log[x].learner_id)
            {
                points += log[x].submission.score;
            }
        }
        return points;
    }
  }

  
  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    let myID = submissions[0].learner_id;
    console.log(myID);
    
    let myPoints = getPointTotal(submissions, myID);
    let possPoints = getPointTotal(ag.assignments);
    let myGrade = myPoints/possPoints;

    console.log(myGrade);

    let todayDate = ""+currentDate.slice(0,4)+currentDate.slice(5,7)+currentDate.slice(8,11);

    for(let x = 0; x < 2; x++)
    {
        let dueDate = ""+ag.assignments[x].due_at.slice(0,4)+ag.assignments[x].due_at.slice(5,7)+ag.assignments[x].due_at.slice(8,11);
        if(todayDate >= dueDate)
        {
            console.log("Due");
        }
        else
        {
            console.log("Not due");
        }
    };

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
  
  //console.log(result);
  