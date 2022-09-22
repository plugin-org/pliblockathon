import 'package:flutter/material.dart';
import 'package:startup_hub/Screens/home.dart';
import 'package:startup_hub/Services/form.dart';
import '../Widgets/widgets.dart';
import '../Widgets/constants.dart';
import '../Widgets/roundButton.dart';

class patent extends StatelessWidget {
  static const String id = 'patent';
  const patent({super.key});

  @override
  Widget build(BuildContext context) {
    String startupdescription = '';
    String startupname = '';
    return Scaffold(
      appBar: appBar(),
      drawer: apdrawer(),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Hub Patents',
              style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.bold,
                  color: Color.fromARGB(255, 103, 35, 125)),
            ),
            SizedBox(
              height: 30,
            ),
            TextField(
              onChanged: (value) {
                startupname = value;
              },
              decoration: kTextFieldDecoration.copyWith(
                  hintText: 'Enter the startup name'),
            ),
            SizedBox(
              height: 20,
            ),
            TextField(
              style: TextStyle(fontSize: 10),
              keyboardType: TextInputType.multiline,
              maxLines: null,
              onChanged: (value) {
                startupdescription = value;
              },
              decoration: kTextFieldDecoration.copyWith(
                  hintText: 'Enter the Startup Description.'),
            ),
            SizedBox(
              height: 20,
            ),
            RoundButton(
              color: Colors.lightBlueAccent,
              title: 'post',
              onPressed: () {
                Navigator.push(
                    context, MaterialPageRoute(builder: ((context) => Home())));
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: bar(),
    );
  }
}
