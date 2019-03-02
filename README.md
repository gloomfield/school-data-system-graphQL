### Start Server ###
npx nodemon students.js

### Commands for graphQL ###
# Get Queries
query GetAllStudents{
	students{
		studentId, name, email, groupId, birthday
	}
}

query GetStudent{
	student(studentId: 1002){
		studentId, name, email, groupId, birthday
	}
}

query GetAllCourses{
	courses{
		courseId, teacherName, description
	}
}

query GetCourse{
	course(courseId: 103){
		courseId, teacherName, description
	}
}

query GetGrades{
	grades{
    studentId,
    courseGrades 
    {
       courseId, grade 
    }
  }
}

query GetGradesStudent{
	gradesStudent(studentId:1002){
    studentId,
    courseGrades 
    {
      courseId, grade
    }
  }
}

# Mutations
mutation CreateNewStudent{
     createStudent(name:"Hans Tester", groupId:"123", email:"test@test.com", birthday:"1999-09-09")
    { success }
}

mutation CreateNewCourse{
     createCourse(description:"Rocket Science", teacherName:"New Teacher")
    { success }
}







