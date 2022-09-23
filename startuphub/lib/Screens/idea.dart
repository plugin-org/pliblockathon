import 'package:flutter/material.dart';
import 'package:startup_hub/Screens/home.dart';
import '../Widgets/widgets.dart';
import '../Widgets/constants.dart';
import '../Widgets/roundButton.dart';
import '../Services/functions.dart';

class patent extends StatefulWidget {
  static const String id = 'patent';
  const patent({super.key});

  @override
  State<patent> createState() => _patentState();
}

class _patentState extends State<patent> {
  final TextEditingController titleController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();

  @override
  void dispose() {
    super.dispose();
    titleController.dispose();
    descriptionController.dispose();
  }

  @override
  Widget build(BuildContext context) {
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
              'Hub Ideas',
              style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.bold,
                  color: Color.fromARGB(255, 103, 35, 125)),
            ),
            SizedBox(
              height: 30,
            ),
            TextField(
              controller: titleController,
              decoration:
                  kTextFieldDecoration.copyWith(hintText: 'Enter the idea'),
            ),
            SizedBox(
              height: 20,
            ),
            TextField(
              style: TextStyle(fontSize: 10),
              keyboardType: TextInputType.multiline,
              maxLines: null,
              controller: descriptionController,
              decoration: kTextFieldDecoration.copyWith(
                  hintText: 'Enter the  Description.'),
            ),
            SizedBox(
              height: 20,
            ),
            RoundButton(
              color: Colors.lightBlueAccent,
              title: 'post',
              onPressed: () {
                Services().addStartup(
                    titleController.text, descriptionController.text);
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
