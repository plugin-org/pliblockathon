import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import '../Widgets/widgets.dart';
import '../Services/functions.dart';
import '../Widgets/patentContainer.dart';

class Home extends StatefulWidget {
  const Home({super.key});
  static const String id = 'home';
  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
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
    var startupServices = context.watch<Services>();
    return Scaffold(
      appBar: appBar(),
      drawer: apdrawer(),
      body: startupServices.isLoading
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : RefreshIndicator(
              onRefresh: () async {},
              child: ListView.builder(
                itemCount: startupServices.startups.length,
                itemBuilder: (context, index) {
                  return patentContainer(
                    teamName: startupServices.startups[index].title.toString(),
                    description:
                        startupServices.startups[index].description.toString(),
                  );
                },
              ),
            ),
      /* body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.all(20),
            child: TextField(
              obscureText: false,
              onChanged: (value) {},
              decoration: kTextFieldDecoration.copyWith(hintText: 'Search'),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(10),
            child: patentContainer(
              teamName: "Startup hub",
              description: "This is impossible",
            ),
          ),
          RoundButton(
              color: Colors.lightBlueAccent,
              title: 'create patent',
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: ((context) => patent())));
              }),
        ],
      ),
      
    ); */
      bottomNavigationBar: bar(),
    );
  }
}
