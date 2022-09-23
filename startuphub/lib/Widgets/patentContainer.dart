import 'package:flutter/material.dart';

class patentContainer extends StatelessWidget {
  String teamName;
  String description;
  patentContainer({required this.teamName, required this.description});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      shadowColor: Colors.black,
      color: Color.fromARGB(255, 119, 204, 250),
      child: SizedBox(
        width: 300,
        height: 200,
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              SizedBox(
                height: 10,
              ), //SizedBox
              Text(
                teamName,
                style: TextStyle(
                  fontSize: 30,
                  color: Colors.white,
                  fontWeight: FontWeight.w500,
                ), //Textstyle
              ), //Text
              SizedBox(
                height: 15,
              ), //SizedBox
              Text(
                description,
                style: TextStyle(
                  fontSize: 15,
                  color: Colors.black,
                ), //Textstyle
              ), //Text
              const SizedBox(
                height: 10,
              ), //SizedBox
            ],
          ),
        ),
      ),
    ); /*Flexible(
      child: Container(
        constraints: BoxConstraints(minHeight: 100, maxHeight: 300),
        height: 200,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10), color: Colors.blue),
        child: Column(
          children: <Widget>[
            Padding(
              padding: EdgeInsets.all(10),
              child: Text(
                teamName,
                textAlign: TextAlign.center,
                style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    color: Colors.white),
              ),
            ),
            SizedBox(
              height: 5,
            ),
            Padding(
              padding: EdgeInsets.all(10),
              child: Text(
                description,
                style: TextStyle(fontSize: 15, color: Colors.black),
              ),
            )
          ],
        ),
      ),
    );*/
  }
}
